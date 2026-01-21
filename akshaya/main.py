from fastapi import FastAPI
app=FastAPI()
@app.get("/hello")
def Welcome():
    return{"welcome to world of jokery"}