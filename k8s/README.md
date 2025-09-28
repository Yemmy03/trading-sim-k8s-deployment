# Trading-Sim Kubernetes Deployment

This repository contains Kubernetes manifests for deploying the **Trading Simulation App** (`trading-sim`) on a k3s (or any Kubernetes) cluster. The setup includes **Deployment**, **ConfigMap**, and **Service** objects for a complete running application.

---

## Components

### 1. Deployment (`trading-sim-deployment.yaml`)
Defines the app’s pod and container spec:
- Runs a single replica of the `yemmy03/trading-sim-app` container.
- Exposes port **3000** inside the pod.
- Pulls environment variables from a **ConfigMap**.

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: trading-sim
spec:
  replicas: 1
  selector:
    matchLabels:
      app: trading-sim
  template:
    metadata:
      labels:
        app: trading-sim
    spec:
      containers:
      - name: trading-sim
        image: yemmy03/trading-sim-app
        ports:
        - containerPort: 3000
        envFrom:
        - configMapRef:
            name: trading-sim-config
\`\`\`

---

### 2. ConfigMap (`trading-sim-config.yaml`)
Stores non-sensitive configuration for the app.

\`\`\`yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: trading-sim-config
data:
  DEMO_GREETING: "Welcome to Trading-Sim"
  DEMO_MODE: "true"
\`\`\`

---

### 3. Service (`trading-sim-service.yaml`)
Exposes the app to the cluster (and optionally outside).

\`\`\`yaml
apiVersion: v1
kind: Service
metadata:
  name: trading-sim-service
spec:
  selector:
    app: trading-sim
  ports:
  - protocol: TCP
    port: 80        # service port
    targetPort: 3000  # container port
  type: NodePort
\`\`\`

---

## 🚀 Usage

1. **Clone the repo**
   \`\`\`bash
   git clone git@github.com:Yemmy03/trading-sim-k8s.git
   cd trading-sim-k8s
   \`\`\`

2. **Apply ConfigMap**
   \`\`\`bash
   kubectl apply -f trading-sim-config.yaml
   \`\`\`

3. **Apply Deployment**
   \`\`\`bash
   kubectl apply -f trading-sim-deployment.yaml
   \`\`\`

4. **Apply Service**
   \`\`\`bash
   kubectl apply -f trading-sim-service.yaml
   \`\`\`

5. **Verify**
   \`\`\`bash
   kubectl get pods
   kubectl get svc
   \`\`\`

6. **Access App**
   - Using NodePort:  
     \`\`\`
     http://<node-ip>:<node-port>
     \`\`\`
   - Example: \`http://localhost:30080\`

---

## 📖 References
- [Kubernetes Docs – Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)  
- [Kubernetes Docs – ConfigMaps](https://kubernetes.io/docs/concepts/configuration/configmap/)  
- [Kubernetes Docs – Services](https://kubernetes.io/docs/concepts/services-networking/service/)  
EOF
