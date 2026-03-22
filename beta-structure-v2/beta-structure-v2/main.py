# main.py

import uvicorn

if __name__ == "__main__":
    uvicorn.run("backend.api.server:app", reload=True)