## Create AWS account and launch an EC2 instance

- create ssh key pair and save the private key in downloads folder(for now). Corresponding public key will be saved on our VM.
- open ports 22(SSH), 443(HTTPS), 80(HTTP) through security groups inbound rules. Allow incoming requests to these ports from everywhere(0.0.0.0/0)

## SSH into our VM

- To SSH into our VM, we need to change permisions of the private ssh key that we downloaded. Because SSH says - "Private key must NOT be publicly accessible"
- It suggests to keep 400 permision ie only read access to the owner. We do this using the command - `chmod 400 ~/Downloads/bookmates-key.pem`
- Now we can SSH to our VM using the command - `ssh -i ~/Downloads/bookmates-key.pem ubuntu@YOUR_PUBLIC_IP` i=use this private key for authentication

# Note:

- / is the top-most directory of the entire system in a linux based OS like ubuntu or MacOS. Its like an entire building. Contains system level directories like etc,home,users.
- ~ is the home directory, your personal root folder. It is generally present inside the home or users directory of root directory(/). Contains personal directories like Desktop, Downloads, Documents
- Whenever we open a terminal on our machine(laptop), generally we are in our home directory (/Users/ishantripathi)
- Also when we SSH into our VM, we are inside our home directory (/home/ubuntu)
- For a permission code xyz, x is for owner, y is for users in a group and z is for everyone. 4 is for read access, 2 for write access and 1 for execute access. For read and write access, we use 6(4+2).

## Proper SSH Setup (.ssh folder + config)

- Right now to SSH in our VM, we do `ssh -i ~/Downloads/bookmates-key.pem ubuntu@YOUR_PUBLIC_IP`.
- We need to shorten this long command.
- We do this in following steps -
  - `mv ~/Downloads/bookmates-key.pem ~/.ssh/` move our private key to .ssh folder
  - `chmod 700 ~/.ssh` secure the .ssh folder. Only i should be able to access it.
  - `nano ~/.ssh/config` open the config file of ssh in edit mode.
  - Add following config there -
    Host bookmates
    HostName YOUR_PUBLIC_IP
    User ubuntu
    IdentityFile ~/.ssh/bookmates-key.pem
  - Save the config(ctrl+o) and exit editor(ctrl+x)
- Now our command becomes `ssh bookmates`

# Note:

- SSH (Secure Shell) is a network protocol + software tool used to connect to remote machines securely.
- It comes pre installed in most of the machines with the name OpenSSH
- OpenSSH is a software that uses the SSH protocol to establish a secure, encrypted connection to a remote machine and gives you a shell on that machine.
- SSH is a protocol like HTTP, FTP etc
- Whenever we run the ssh command, this is what happens -
  - OpenSSH software starts
  - Connects to server IP on port 22
  - Performs authentication (using key)
  - Creates secure encrypted connection
  - Opens remote terminal
- SSH coonection is secure - it uses encryption, it uses key-based authentication, it prevents password sniffing.
- There is one SSH program running on our server(VM) too which acccepts our ssh connection.
- The standard folder to store our private ssh key is `~/.ssh` folder.
- Generally it comes be default in any machine. But if it does not, we create it.
- After we have moved our private ssh key in `~/.ssh` folder and added config in `~/.ssh/config`, this is what OpenSSH does when run `ssh bookmates` -
  - It goes to `~/.ssh/config`
  - Looks for `Host bookmates`
  - Reads its settings
  - Picks the private key from path specified in `IdentityFile`
  - Establishes a ssh connection using that key to the server specified in `HostName` as user specified in `User`
- We can put our private ssh key in any other folder too. We just need to mention its path under `IdentityFile`.
- But the standard is to put our private ssh key in .ssh folder only.
- Remember to secure both .ssh folder(700) and private ssh key(400). Otherwise ssh connnection will not be established.

## Install Node.js on our VM

- To install anything on ubuntu, we use apt(a package manager).
- Since installing softwares on our VM requires system level permisions, we install softwares as super user or root user (sudo).
- We have two ways to install Node.js and npm -
  - Simple way - `sudo apt install nodejs`. This installs older version of node.js and also we need to seperately install npm(sudo apt install npm).
  - Using NodeSource(recommended way) - It installs the latest version of node.js along with npm. It is the industry standard approach.
- To install Node.js using NodeSource -
  - `sudo apt update` we first update the system (sudo because updating system requires system level permisions)
  - `curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -` add NodeSource’s package repository to our VM, so that apt knows where to find the latest Node.js LTS.
  - `sudo apt install -y nodejs` install Node.js

## Install git, pull the backend code from github and install dependencies.

- `sudo apt install git -y`
- `git clone YOUR_BACKEND_REPO_URL`
- `npm install` do this in the backend folder if repo has both backend and frontend

## Add .env file to the cloned repo and run try to run server.

- add it in the backend folder if repo has both backend and frontend.
- To add .env file to desired folder -
  - `nano .env` do this in the backend folder if repo has both backend and frontend
  - Paste all the env variables
  - Save the changes using Ctrl+o
  - Exit the text editor using Ctrl+x

# Note:

- nano is a command line text editor for linux.
- It mostly comes pre installed with our OS. If not, we can install it manually `sudo apt install nano` (for ubuntu).
- syntax is `nano filename`. If the file exists, it opens it in edit mode. If it does not, it creates it first and then opens it in edit mode.
- To save file, we do Ctrl+o and to exit editor we do Ctrl+x

## Make your backend express server accessible from anywhere

- By default when we do `app.listen(3000,callback)` in server file, it accepts requests only from same machine(localhost) and rejects external requests.
- To allow our backend express server to accept request from anywhere, we add '0.0.0.0' address to it `app.listen(3000,'0.0.0.0',callback)`
- So we open our server.js file in text editor using nano `nano server.js`, add the address to app.listen() and save it.
- Also since our express server is running on port 3000 and we want to expose it on internet, we need to open this port on our VM using security group inbound rules.

## Process Manager(PM2)

- Right now our backend express server is running using `node server.js`.
- But our backend express server will stop if - we close terminal, SSH disconnects, VM reboots etc etc
- So we need a way to keep your backend express server running in background, always.
- Process manager is a tool that keeps your app running continuously.
- PM2 is a process manager for JavaScript applications, especially Node.js
- PM2 - Runs your app in background, survives SSH disconnect, restarts if it crashes, starts app if VM reboots, keep logs etc etc.
- We do this by -
  - `sudo npm install -g pm2` Installing pm2 globally. Since installing anything globally requires system level permisions, we use sudo
  - `pm2 start server.js --name bookmates-api` Start our backend express server using pm2. We do this in the backend folder where our server.js file is present.
- use command `pm2 ls` to see the list of all application running by pm2
- Doing this will keep our backend express server running in background always but our backend express server will not survive VM reboots.
- For it to survive VM reboots, we do this -
  - `pm2 startup` It will give a command — copy & run it
  - `pm2 save` save all the currently running process

# Note:

- When we run our app using PM2, it registers it as one of its process.
- PM2 keeps all of its processes running in background even when we close terminal, the process crashes, SSH disconnects etc etc.
- But if the VM reboots(by us or due to server maintainance or some other reason), by default PM2 will not start again when the VM restarts.
- Every Linux system (like Ubuntu) has a system that runs services when the machine starts. This system is called systemd (most modern Linux systems).
- systemd starts several services when the machine restarts. We want it to start PM2 also. This command `pm2 startup` helps us in doing this.
- `pm2 startup` when we run this command, it generates a startup script and gives us a command. Running that command tells systemd: “Whenever system starts, run PM2 for user ubuntu”.
- So now everytime our VM restarts, pm2 will start too.
- But how does PM2 know which processes to run once it starts again. It runs all the processes that have been saved prior to VM reboot.
- `pm2 save` when we run this command, it saves all the currently running processes in `~/.pm2/dump.pm2`.
- Now whenever the VM reboots, pm2 is started again. PM2 looks for all the saved processes in `~/.pm2/dump.pm2` and starts running them.
- This ways our app survives VM reboots.

## Nginx

- Right now our backend Express server can be accessed publicly using the URL `http://PUBLIC_IP_OF_VM:3000`.
- This has two main problems:
  - We need to mention the port number in the URL, which makes it ugly.
  - Our Node app is exposed directly to everyone.
- Nginx solves this problem by acting as a reverse proxy.
- It sits at port 80 and forwards any request to our backend Express server.
- Steps to install Nginx:
  - `sudo apt update` - update the system package list.
  - `sudo apt install nginx -y` - install Nginx.
- Steps to configure Nginx:
  - `sudo nano /etc/nginx/sites-available/default` - open the default config file (`sudo` is needed because `/etc` is a system-level directory).
  - Inside the server block, replace the existing `location /` block:

    Before:

    location / {
    try_files $uri $uri/ =404; // Serving static files.
    }

    After:

    location / {
    proxy_pass http://localhost:3000; // Reverse proxy. This tells Nginx - “Forward this request to another server”
    }

  - `sudo nginx -t` Ensure config has no syntax errors. If no errors, it will print - syntax is ok. test is successful
  - `sudo systemctl restart nginx` restart Nginx.
  - Now we can access our express backend server using - `http://PUBLIC_IP_OF_VM`
  - Also now since port 3000 is not exposed on internet, we can close this port on our VM using security group inbound rules.

# Note

- When we hit an http request from our browser without mentioning the port number, by default it sends it to port 80 of the machine on which we are sending the request.
- But if we mention port number, it sends it to the specified port.
- Similarly for an https request, default port is 443.
- And similarly when we SSH into a VM from our terminal without mentioning the port number, by default it uses port 22 for connection. If port is mentioned, it uses specified port.
- So if we want to remove port number from our URL, we need to run it on port 80. This way we can access our backend express server using `http://PUBLIC_IP_OF_VM`.
- But we can't do this because -
  - Since ports below 1024 requires root level access to run anything on them, we need to run our express backend as a root user (sudo node server.js) which is big security risk.
  - We can only run one node server at a time because port 80 can be accessed by only one node server at a time. So no scalabilty.
  - Still our node app is exposed directly to everyone.
- Nginx is a web server + reverse proxy that sits between users and your backend.
- Web Server: Serves static files like HTML, CSS, Images.
- Reverse Proxy: Forwards requests to another server (your Node app).
- We run Nginx on port 80.
- Whenever browser hits `http://PUBLIC_IP_OF_VM`, the request is received by Nginx and it forwards it to our backend express server.
- Our backend express server then sends the response to Nginx which then sends it back to browser.
- So Nginx acts as middleman.
- This is reverse proxy. A normal proxy hides client from server. Reverese proxy hides server from client.
- Since Nginx is running on port 80, we can remove port number from the url.
- Also since Nginx is a system level software, it can run on port 80.
- Now our node app is not directly exposed to everyone.
- Also we can run multiple node servers at a time. Nginx will forward any request to its corresponding node server.
- Till now we wanted our express server to receive direct request from anywhere on internet and thus we added '0.0.0.0' in our app.listen().
- But now we only want it to receive request from Nginx. Thus we can remove '0.0.0.0' from app.listen().
- Now our express server can only receive request from same machine. Since both Nginx and our express server are running on same machine, Nginx can send request to our express server.
- When browser sends `http://PUBLIC_IP_OF_VM` to Nginx, Nginx sends `http://localhost:3000` to our express server.
- Also now since port 3000 is not exposed on internet, we can close this port on our VM using security group inbound rules.
- My express app is still running on port 3000. We just blocked internet access to port 3000.
- Nginx can still access it because Nginx sending request to our express server is internal trafic. Security groups control external traffic, not internal communication.
- And ports are not just for “internet traffic”, they are for any communication, even internal.
- Installing Nginx also starts it automatically as a system service, and its default configuration tells it to listen on port 80. This is why it automatically starts running on port 80.
- Nginx config has all the settings for Nginx. From there we can control on which port Nginx should run, to which node server it should forward any particular request and also many more configrations.
- This config file is present at `/etc/nginx/sites-available/default`. We edit it using nano.
- By default when we install Nginx, it serves a static html file at port 80. The `location/` block inside server block has `try_files $uri $uri/ =404;`
- Later we configure it for reverse proxy(forwarding request to our node app) by replacing `try_files $uri $uri/ =404;` with `proxy_pass http://localhost:3000;`

## Add domain name

- Buy a domain from namecheap - bookmates.xyz
- Create a subdomain for backend - api.bookmates.xyz by adding a DNS record with following settings -
  Type: A Record
  Host: api
  Value: YOUR_EC2_IP
  TTL: Automatic

- ## Deploy frontend on vercel
- Deploy frontend by linking the github repo of frontend with vercel.
- Vercel will ask to add env variables seperately.
- After successfull deployment, we will get a domain from vercel to access our frontend.
- To get a custom domain name for our frontend (like bookmates.xyz), we will add the domain "bookmates.xyz" for our frontend in vercel

# Note:

- There are mainly two types of DNS records - A and CName
- 'A' record maps a domain/subdomain directly to an IP address. 'CName' maps a domain/subdomain to another domain/subdomain (not IP).
- 'Host' while adding a record means subdomain. Host + Domain = Full domain. We can add multiple subdomains to a domain. So in api.bookmates.xyz, Host is api and domain is bookmates.
- Host = @ means no subdomain, just the main domain.
- Since we want to map our domain with domain given by vercel, we need to add a Cname record with Host=@ and Value=domain given by vercel
- Vercel might also ask to add an 'A' record with given IP

## Install SSL certificate from Let's Encrypt

- It is done in following steps
  - `sudo apt update` update the system
  - `sudo apt install certbot python3-certbot-nginx -y` install Certbot
  - Certbot modifies Nginx config automatically
  - `sudo certbot --nginx -d api.bookmates.xyz` Generate SSL certificate
  - Again Certbot modifies Nginx config to add the SSL certificate that it just generated.
  - But we will just delete current config of Nginx and add following config -

        # HTTPS server

        server {
        listen 443 ssl;
        listen [::]:443 ssl;

              server_name api.bookmates.xyz;

              ssl_certificate /etc/letsencrypt/live/api.bookmates.xyz/fullchain.pem;
              ssl_certificate_key /etc/letsencrypt/live/api.bookmates.xyz/privkey.pem;

              include /etc/letsencrypt/options-ssl-nginx.conf;
              ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

              location / {
                  proxy_pass http://localhost:3000;
              }

        }

        # HTTP → HTTPS redirect

        server {
        listen 80;
        listen [::]:80;

        server_name api.bookmates.xyz;

        return 301 https://$host$request_uri;

    }

- In the config we also add a redirect so that if anyone sends an HTTP request to the server, it is automatically redirected to the HTTPS version of the same URL.

# Note:

