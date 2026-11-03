# Download and install docker on our machine(windows/mac)

# Create Dockerfile and .dockerignore file

- Inside our backend directory, create a file named `Dockerfile` and `.dockerignore`
- Add following to the Dockerfile -

```
    FROM node:22
    WORKDIR /app
    COPY package.json package-lock.json ./
    RUN npm ci
    COPY . .
    CMD ["node", "server.js"]

```

- Add following to the .dockerignore file

```
.env
node_modules
```

### Note:

- Every image that we create has a base image, the main application needed to run any app.
- In a Node.js backend server, its Node.js
- `FROM` specifies the base image for our custom image. Any Dockerfile starts with this. `node:22` is an existing image that provides Node.js 22 and npm.
- Now every image has its own file system. For a custom image, the file system is adopted from the base image.
- So in a custom image with Node.js as base image, file system is of Node.js.
- The root directory(/) of Node.js(or basically our custom image) has many folders like bin,usr,etc and many more.
- `WORKDIR` sets the working directory in our image. Subsequent Dockerfile instructions uses that directory as their working directory unless another `WORKDIR` changes it.
- So `WORKDIR /app` creates an app directory in the root directory(/) if it doesn't exist, and then sets it as the working directory for the image.
- We will be putting all our backend code in `/app` directory of image.
- After this, an additional folder named app is created in the root directory, alongside the other folders (bin, usr, etc, etc.).
- Also after this, in the context of image, current directory(.) will always point to `/app` unless another `WORKDIR` changes it.
- `COPY <src>... <dest>` copies files/folders from our local machine to docker image.
- <src> is the path of file/folder in the build context directory(specified in the build command). We can copy multiple files at once.
- <dest> is the path in the working directory(the one set by WORKDIR) of the image.
- `COPY package.json package-lock.json ./` copies `package.json` and `package-lock.json` from our build context directory to the working directory(/app) of image.
- `COPY . .` copies all files/folder from our build context directory to the working directory(/app) of image.
- Inside our backend directory, we also create a `.dockerignore` file, just like .gitignore file. All the files/folders mentioned inside `.dockerignore` file are not copied when `COPY` is used.
- We put `node_modules` and `.env` in `.dockerignore` file.
- We put `.env` in `.dockerignore` because we do not want to expose our enviroment variables. We put `node_modules` because -
  - If we copy `node_modules` from our local machine to docker image using `COPY` command, it will take a lot of time and thus build time of docker image increases.
  - OS Mismatch: Some Node.js packages build files that only work on the OS they were installed on. If you install on Windows or macOS and copy `node_modules` into a Linux container, the app can crash. Add `node_modules` to `.dockerignore` so the container installs its own copy.
- `RUN` runs any command while the image is being created. `RUN npm ci` installs all dependencies included in `package.json` file and puts them inside a `node_modules` folder inside `/app` directory of our image.
- `CMD` runs any command when a container starts. Since we want to start our backend server once the container starts, we do `CMD ["node", "server.js"]` . We pass command as array of strings.

# Build the Docker Image

- `docker build -t bookmates-backend .`

### Note:

- `docker build -f PATH_TO_DOCKERFILE -t IMAGE_NAME BUILD_CONTEXT_DIRECTORY` this is the general build command.
- The `BUILD_CONTEXT_DIRECTORY` set in this build command will be used as the working directory of our local machine throughout the `Dockerfile` commands.
- Thus while building the image using this build command, in the context of our local machine, current directory(.) will always point to `BUILD_CONTEXT_DIRECTORY` specified in build command.
- If we are in the same directory as our `Dockerfile`, we do not need `-f` flag and `Dockerfile` path.
- Suppose we are inside the backend directory of our project which has the `Dockerfile`, our command will be `docker build -t bookmates-backend .`
- `-t` sets name of the image.
- In this case the `BUILD_CONTEXT_DIRECTORY` will be our backend directory because we ran this command there and set the `BUILD_CONTEXT_DIRECTORY` as `.`
- Once the image is built, docker stores it in a local image store on our machine.

# Running container from the image built

- `docker run --env-file .env -p 3000:3000 --name bookmates-container bookmates-backend`

### Note:

- Since the image is stored in the local image store on our machine, we can run this command from any directory. We just need to mention image name.
- `--name` sets name of the container.
- `-p` sets the port mapping.
- A container has its own file system,network environment etc etc. Thus it has its own ports, which are seperate from the ports of our machine.
- When we run a backend server (listening at port 3000) inside a container, it is listening at port 3000 of container, and not of our machine(mac/windoe or EC2 VM).
- Since now our backend server is not listening at port 3000 of our machine, `http://localhost:3000` won't work until we do port mapping while running our conatiner.
- port mapping is used to map a port of a machine to the port of a container.
- `-p p1:p2` means - all the requests made at port p1 of the machine will be forwarded to port p2 of container.
- `--env-file` sets the .env file for the container we are running.
- Remember while building the image, we did not include `.env` file in our image for security purposes. Now obviously we need it to run our backend server inside the container.
- We need to mention the relative path of `.env` file from the directory we are running the RUN command. In our case, we are running it from our backend directory and thus only name is enough.
- Thus we need to send the `.env` file seperately to anyone who wants to run a container from our image. If we want to run it on our EC2 VM, we need to add `.env` file there.`

# Pushing image to Docker Hub

- We first create a repository on Docker Hub. Images from public repo can be pulled by anyone. For private, authentication is needed. For now we will keep it public.
- Then run the following commands to push the image in the repo created -
  - `docker login` Credentials of Docker Hub will be asked
  - `docker tag bookmates-backend DOCKERHUB_USERNAME/REPOSITORY_NAME:TAG` Tag your local image
  - `docker push DOCKERHUB_USERNAME/REPOSITORY_NAME:TAG` push the image with the tag set in previous step.

### Note:

- `docker tag` command lets us set another name for any existing image. General format is `docker tag EXISTING_IMAGE_NAME ANOTHER_NAME`.
- When we tag an image with multiple different names, all of them points to the same image. We can use anyone of them to do anything with the image.
- Tagging an image with another name does not create a new copy of the image. It just gives it another name.
- The `:tag` used while naming an image is different from the tagging we are refering here.
- `:tag` is generaly used to specify different versions of same image like `bookmates-backend:v1`, `bookmates-backend:v2`
- While building an image or tagging an image, if we do not sepecify `:tag` with its name, by default docker sets it to `:latest`.
- And whenver we use the name of an image without `:tag` in docker commands, docker assumes it to be `:latest`. Thus `docker run bookmates-backend` is equivalent to `docker run bookmates-backend:latest`
- Now to push any image to any repo of dockerhub, we need to tag(name) it as `DOCKERHUB_USERNAME/REPOSITORY_NAME:TAG`.
- If we do not specify `:tag`, docker will tag(name) it as `DOCKERHUB_USERNAME/REPOSITORY_NAME:latest`.
- We cannot push an image with any random name. It must follow the convention.
- Once we tag(name) our image with the conventional name, we can push it to dockerhub using that name. On dockerhub, our image will be present with this same name. Thus anyone who wishes to pull it must use this name.
- We can even push different versions of the same image on a dockerhub repo. This can help in switching between different versions of our application.
- We can use the `docker tag` command to give different versions to same image.
- Suppose we created an image named `bookmates-backend:v1`. Then we did some changes in the code of our app.
- Now we can tag(name) it as `bookmates-backend:v2` using `docker tag bookmates-backend:v1 bookmates-backend:v1`. v1 contains old code and v2 constains new code.
- We can push both on our dockerhub repo(obviously after tagging them with conventional name). Then we can switch to different versions of our app by simply pulling any version of image we want.
