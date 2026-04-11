<h1 align="center">🚀 Secure Containerized MERN Stack with Nginx Reverse Proxy + Jenkins DevSecOps Pipeline</h1>

<p align="center">
A professional-grade full-stack application demonstrating <b>Microservices Architecture</b>, <b>Containerization</b>, <b>CI Pipeline Automation</b>, and <b>DevSecOps Security Scanning</b> using Docker, Nginx, Jenkins, SonarQube, Gitleaks, and Trivy.
</p>

<hr>

<h2>🏗️ Project Architecture</h2>
<p>
This project is not just about CRUD functionality — it focuses on how modern applications are <b>built, secured, containerized, scanned, and deployed</b>.
</p>

<h3>🔹 Core Architecture</h3>
<ul>
  <li><b>Frontend:</b> React.js (SPA)</li>
  <li><b>Backend:</b> Node.js &amp; Express.js API</li>
  <li><b>Database:</b> MongoDB Atlas (Cloud)</li>
  <li><b>Reverse Proxy:</b> Nginx</li>
  <li><b>Orchestration:</b> Docker Compose</li>
  <li><b>CI/CD:</b> Jenkins Pipeline</li>
  <li><b>Security:</b> Gitleaks, SonarQube, Trivy</li>
</ul>

<hr>

<h2>🛠️ Key Technical Features</h2>

<h3>1) 🐳 Dockerization &amp; Orchestration</h3>
<p>The entire stack is containerized using optimized Dockerfiles.</p>
<pre><code>docker compose up --build</code></pre>
<p>This ensures a <b>consistent deployment environment across all systems</b>.</p>

<h3>2) 🌐 Nginx Reverse Proxy</h3>
<ul>
  <li>Serves static React frontend files</li>
  <li>Routes <code>/api</code> requests to backend container</li>
  <li>Eliminates CORS issues in production-style deployments</li>
  <li>Simulates real-world reverse proxy architecture</li>
</ul>

<h3>3) 🔗 Service Discovery &amp; Networking</h3>
<ul>
  <li>Frontend → <code>http://backend:5000</code></li>
  <li>Nginx routes traffic between frontend and backend</li>
  <li>Uses Docker bridge networking instead of localhost</li>
</ul>

<h3>4) 🧪 API Testing</h3>
<p>All REST endpoints were tested using <b>Postman</b>.</p>
<ul>
  <li>200 OK</li>
  <li>201 Created</li>
  <li>Request validation</li>
  <li>Response schema</li>
  <li>Error handling</li>
</ul>

<h3>5) ⚙️ Jenkins DevSecOps Pipeline</h3>
<p>Implemented an automated Jenkins CI pipeline with the following secure stages:</p>
<ol>
  <li>Checkout</li>
  <li>Gitleaks Secret Scan</li>
  <li>Build / Validation</li>
  <li>SonarQube Static Code Analysis</li>
  <li>Docker Build</li>
  <li>Trivy Vulnerability Scan</li>
  <li>Container Deployment</li>
</ol>

<h3>6) 🔐 Security Scanning</h3>
<ul>
  <li><b>Gitleaks</b> → Detects hardcoded secrets and tokens</li>
  <li><b>SonarQube</b> → SAST, bugs, code smells, quality gates</li>
  <li><b>Trivy</b> → HIGH / CRITICAL container vulnerability scanning</li>
</ul>

<hr>

<h2>📁 Project Structure</h2>
<pre>
MERN STACK
├── 📂 backend
│   ├── 📂 models
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
├── 📂 frontend
│   ├── 📂 public
│   ├── 📂 src
│   ├── Dockerfile
│   └── package.json
├── 🐳 docker-compose.yml
├── ⚙️ nginx.conf
└── ⚙️ Jenkinsfile
</pre>

<hr>

<h2>🚀 Getting Started</h2>
<h3>Prerequisites</h3>
<ul>
  <li>Docker &amp; Docker Compose</li>
  <li>MongoDB Atlas Connection String</li>
  <li>Jenkins</li>
  <li>SonarQube</li>
  <li>Trivy</li>
</ul>

<h3>Clone the Repository</h3>
<pre><code>git clone https://github.com/sachilz/dockerized-mern-app
cd dockerized-mern-app</code></pre>

<h3>Run with Docker Compose</h3>
<pre><code>docker compose up --build</code></pre>

<h3>Access the Application</h3>
<ul>
  <li>Frontend/App → <code>http://localhost:80</code></li>
  <li>Backend API → <code>http://localhost/api</code></li>
</ul>

<hr>

<h2>👨‍💻 Developed By</h2>
<p><b>Sachintha Dilshan</b><br>
DevOps | Cloud | DevSecOps Enthusiast</p>
