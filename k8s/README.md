# Trading-Sim Kubernetes Deployment

This repository contains Kubernetes manifests for deploying the **Trading Simulation App** (`trading-sim`) on a k3s (or any Kubernetes) cluster. The setup includes **Deployment**, **ConfigMap**, and **Service** objects for a complete running application.

---

## Components

### 1. Deployment (`trading-sim-deployment.yaml`)
Defines the app’s pod and container spec:
- Runs a single replica of the `yemmy03/trading-sim-app` container.
- Exposes port **3000** inside the pod.
- Pulls environment variables from a **ConfigMap**.

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: trading-sim
  labels:
    app: trading-sim-staging
spec:
  replicas: 1
  selector:
    matchLabels:
      app: trading-sim-staging
  template:
    metadata:
      labels:
        app: trading-sim-staging
    spec:
      containers:
      - name: trading-sim
        image: yemmy03/trading-sim-app
        ports:
        - containerPort: 3000
        envFrom:
        - configMapRef:
            name: trading-sim-config 
```

---

### 2. ConfigMap (`trading-sim-config.yaml`)
Stores non-sensitive configuration for the app.

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: trading-sim-config
data:
  NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAY_P5ep3xxp88XhJ_djiAHeSfibg8ubrw
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=trading-simulator-440a8.firebaseapp.com
  NEXT_PUBLIC_FIREBASE_PROJECT_ID=trading-simulator-440a8
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=trading-simulator-440a8.appspot.com
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=398224444164
  NEXT_PUBLIC_FIREBASE_APP_ID=1:398224444164:web:01bee014b96c9ffa3a5e51
```

---

### 3. Service (`trading-sim-service.yaml`)
Exposes the app to the cluster.

```
apiVersion: v1
kind: Service
metadata:
  name: trading-sim-service
spec:
  selector:
    app: trading-sim-staging
  ports:
  - name: name-of-service-port
    protocol: TCP
    port: 80
    targetPort: 3000
  type: NodePort
```

---

## Usage

1. **Clone the repo**
  ```
   git clone git@github.com:Yemmy03/trading-sim-k8s.git
   cd trading-sim-k8s
   ```

2. **Apply ConfigMap**
   ```
   kubectl apply -f trading-sim-config.yaml
   ```

3. **Apply Deployment**
   ```
   kubectl apply -f trading-sim-deployment.yaml
   ```

4. **Apply Service**
   ```
   kubectl apply -f trading-sim-service.yaml
   ```

5. **Verify**
   ```
   kubectl get pods
   kubectl get svc
   ```

6. **Access App**
    Using NodePort:  
     ```
     http://<node-ip>:<node-port>
     Example: \http://localhost:30080\
     ```
Why is the app accessed at http://localhost:30080 instead of 3000?
```
The app itself runs on port 3000 inside the container, but because the Kubernetes Service is of type NodePort, Kubernetes opens a high external port in the range 30000–32767 (for example, 30080).

The traffic flow looks like this:
Browser → NodePort (30080) → Service port (80) → Container port (3000).

That’s why it reaches the app at http://localhost:30080.
```
---

## References
- [Kubernetes Docs – Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)  
- [Kubernetes Docs – ConfigMaps](https://kubernetes.io/docs/concepts/configuration/configmap/)  
- [Kubernetes Docs – Services](https://kubernetes.io/docs/concepts/services-networking/service/)  

