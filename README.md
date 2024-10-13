<h1>Classify.ai - Government Document Classification</h1>

<p>Classify.ai is an AI-powered solution built to streamline and automate the classification of government documents. The application is built using <strong>Next.js</strong> for the frontend, integrated with <strong>Clerk</strong> for authentication, and leverages <strong>emailJS</strong> for communication. This repository contains the source code for the frontend, backend integration, and components required to classify documents with AI-driven text processing.</p>

<h2>Features</h2>
<ul>
  <li><strong>AI-Powered Text Classification</strong>: Classify documents efficiently using our AI engine.</li>
  <li><strong>User Authentication</strong>: Secure authentication for professionals and students using Clerk.</li>
  <li><strong>Role-Based Access Control</strong>: Users are categorized into <code>professional</code> and <code>student</code> roles for appropriate access.</li>
  <li><strong>Contact Form Integration</strong>: Users can send inquiries via the integrated email system (emailJS).</li>
  <li><strong>Responsive Design</strong>: Modern, responsive UI with interactive elements and smooth animations.</li>
</ul>

<h2 id="installation">Installation</h2>

<h3>Prerequisites</h3>
<p>Before running the project, ensure you have the following installed:</p>
<ul>
  <li>Node.js (version 18+)</li>
  <li>npm or yarn</li>
  <li>A valid Clerk account for authentication</li>
  <li>EmailJS account for handling contact form submissions</li>
</ul>

<h3>Setup</h3>
<ol>
  <li>Clone the repository:</li>
  <pre><code>git clone https://github.com/yourusername/classify-ai.git
cd classify-ai
</code></pre>
  <li>Install dependencies:</li>
  <pre><code>npm install
# or
yarn install
</code></pre>
  <li>Set up your environment variables:</li>
  <p>Create a <code>.env.local</code> file at the root of your project and add the following:</p>
  <pre><code>NEXT_PUBLIC_CLERK_FRONTEND_API_KEY=your_clerk_frontend_key
NEXT_PUBLIC_EMAILJS_SERVICE_KEY=your_emailjs_service_key
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
</code></pre>
</ol>

<h2 id="usage">Usage</h2>
<p>After setting up your environment variables and installing dependencies, start the development server:</p>
<pre><code>npm run dev
# or
yarn dev
</code></pre>
<p>Visit <a href="http://localhost:3000">http://localhost:3000</a> to view the application in your browser.</p>

<h2 id="authentication">Authentication</h2>
<p>This project uses Clerk for user authentication. Ensure you have a Clerk account and have set the appropriate API keys in the <code>.env.local</code> file.<p>

<h2 id="api-endpoints">API Endpoints</h2>
<ul>
  <li><code>/api/classify</code>: Classifies text input based on predefined categories.</li>
  <li><code>/api/contact</code>: Sends a message to the team using emailJS.</li>
</ul>

<h2 id="license">License</h2>
<p>This project is licensed under the MIT License. See the <a href="LICENSE">LICENSE</a> file for more details.</p>

