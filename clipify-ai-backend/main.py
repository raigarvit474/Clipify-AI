from fastapi import Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
import modal
from pydantic import BaseModel

class ProcessVideoRequest(BaseModel):
    s3_key:str

image = (modal.Image.from_registry(
    "nvidia/cuda:12.4.0-devel-ubuntu22.04", add_python="3.12")
    .apt_install(["ffmpeg", "libgl1-mesa-glx", "wget", "libcudnn8", "libcudnn8-dev"])
    .pip_install_from_requirements("requirements.txt")
    .run_commands(["mkdir -p /usr/share/fonts/truetype/custom",
                   "wget -O /usr/share/fonts/truetype/custom/Anton-Regular.ttf https://github.com/google/fonts/raw/main/ofl/anton/Anton-Regular.ttf",
                   "fc-cache -f -v"])
    .add_local_dir("asd", "/asd", copy=True))

app = modal.App("ai-podcast-clipper", image=image)

volume = modal.Volume.from_name(
    "ai-podcast-clipper-model-cache", create_if_missing=True
)

mount_path = "/root/.cache/torch"

auth_scheme=HTTPBearer()

@app.cls(gpu="L40S", timeout=900, retries=0, scaledown_window=20, secrets=[modal.Secret.from_name("ai-podcast-clipper-secret")], volumes={mount_path: volume})
class AiPodcastClipper:
    @modal.enter()
    def load_model(self):
        print("Loading model")
        pass

    @modal.fastapi_endpoint(method="POST")
    def process_video(self,request:ProcessVideoRequest,token:HTTPAuthorizationCredentials=Depends(auth_scheme)):
        print("Processing video"+request.s3_key)
        pass

@app.local_entrypoint()
def main():
    import requests

    ai_podcast_clipper = AiPodcastClipper()

    url=ai_podcast_clipper.process_video.web_url

    payload={
        "s3_key":"test1/mi65min.mp4"
    }

    headers={
        "Content-Type": "application/json",
        "Authorization":"Bearer 123123"
    }

    response=requests.post(url, json=payload, headers=headers)

    response.raise_for_status()
    result=response.json()
    print(result)
    
        

