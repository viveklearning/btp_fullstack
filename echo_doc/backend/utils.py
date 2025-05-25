# utils.py

import os
import pinecone
from pinecone import Pinecone, ServerlessSpec
from dotenv import load_dotenv
import cohere
from langchain_community.document_loaders import PDFPlumberLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
# --- Load environment variables ---
load_dotenv()
COHERE_API_KEY = os.getenv("COHERE_API_KEY")
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")

if not COHERE_API_KEY or not PINECONE_API_KEY:
    raise ValueError("Missing API keys in .env file")

# --- Initialize clients globally ---
co = cohere.Client(COHERE_API_KEY)
pc = Pinecone(api_key=PINECONE_API_KEY)

index_name = "pdf-index"
embedding_dim = 1024  # must match your embedding model

# Create index if not exists
if index_name not in [idx.name for idx in pc.list_indexes()]:
    pc.create_index(
        name=index_name,
        dimension=embedding_dim,
        metric="cosine",
        spec=ServerlessSpec(cloud="aws", region="us-east-1")
    )

# Connect to index
index = pc.Index(index_name)

# --- Embedding function ---
def get_embeddings(texts):
       response = co.embed(
           model="embed-multilingual-v3.0",  # or your preferred model
           texts=texts,
           input_type="search_document"  # Ensure this is set correctly based on the model's requirements
       )
       return response.embeddings

# --- PDF loading ---
def load_pdf(file_path):
    loader = PDFPlumberLoader(file_path)
    return loader.load()

# --- Text chunking ---
def split_text(documents, metadata=None):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    chunks = text_splitter.split_documents(documents)
    
    # Attach metadata (e.g., filename) to each chunk if provided
    if metadata:
        for chunk in chunks:
            chunk.metadata.update(metadata)
    return chunks

# --- Indexing ---
def index_docs(documents):
    index.delete(delete_all=True, namespace="pdf-namespace")

    texts = [doc.page_content for doc in documents]
    embeddings = get_embeddings(texts)

    vectors = []
    for doc, emb in zip(documents, embeddings):
        uid = f"{hash(doc.page_content)}"  # Optional: use uuid.uuid4() for true uniqueness
        vectors.append({
            "id": uid,
            "values": emb,
            "metadata": {
                "text": doc.page_content,
                **doc.metadata
            }
        })

    if vectors:
        index.upsert(vectors=vectors, namespace="pdf-namespace")

# --- Retrieval ---
def retrieve_docs(query):
    query_emb = get_embeddings([query])[0]
    results = index.query(
        vector=query_emb,
        namespace="pdf-namespace",
        top_k=10,
        include_metadata=True
    )
    return [match['metadata']['text'] for match in results.get("matches", [])]

# --- Answer generation ---
def answer_question(question, retrieved_docs):
    context = "\n\n".join(retrieved_docs)
    prompt = f"""
You are an assistant for question-answering tasks. Use the following context to answer in as much detail as possible.

Question: {question}
Context: {context}

Answer:
"""
    response = co.generate(
        model="command-r-plus",
        prompt=prompt,
        temperature=0.3
    )
    return response.generations[0].text.strip()
