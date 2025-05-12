# ✨ Local Farmers' Market Online Platform ✨

## **Project Description**
Szerepkörök: gazdálkodók (eladók), vásárlók és vendég nézők.
A gazdálkodók hozzáadhatják termékeiket, kézműves áruikat és az előrendelés vagy kiszállítás elérhetőségét. Kezelhetik a készletet, beállíthatják az árakat és kínálhatnak szezonális promóciókat. A vásárlók regisztrálhatnak rendelések leadására, kedvenc eladóikra feliratkozhatnak aktualitások azonnali megtekintéséért és részt vehetnek a közösség által támogatott mezőgazdasági (CSA) programokban. A vendég nézők böngészhetik a piac kínálatát, de regisztrálniuk kell a vásárláshoz.

## **Features**
### **1. User Roles**
- **Guest Viewer:** Can browse products but cannot place orders.
- **Customer:** Can register, place orders, and subscribe to favorite farmers.
- **Farmer (Seller):** Can add products, manage inventory, and handle orders.
- **Admin:** Can manage users, orders, and products.

### **2. Core Features**
- **User Authentication (JWT-based login & registration)**
- **Marketplace:** Product listing, image management, categories
- **Pre-orders and Delivery Management**
- **User Notifications** (subscribe to favorite farmers)
- **Admin Dashboard:** Manage users, products, and orders

## **Technology Stack**
| Component | Technology |
|-----------|------------|
| **Backend API** | Node.js + Express.js + TypeScript |
| **Frontend** | Angular 2+ + TypeScript |
| **Database** | MongoDB + Mongoose |
| **Authentication** | JSON Web Token (JWT) |
| **Styling** | Angular Material / Bootstrap |

## **Installation & Usage**
### **1. Clone Repository**
```bash
git clone https://github.com/szflori/online-local-farmers-market.git
cd mean-marketplace
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Run Backend**
```bash
npx nx serve api
```
The server will run on **http://localhost:3000** by default.

### **4. Run Frontend**
```bash
npx nx serve frontend
```
The frontend will be available at **http://localhost:4200**.

## **API Endpoints**
- `POST /auth/register` - User registration
- `POST /auth/login` - Login with JWT token
- `GET /products` - Retrieve product list
- `POST /products` - Create a new product (farmers only)
- `POST /orders` - Place an order (customers only)

## **Development**
This project uses **Nx workspace** to manage both frontend and backend applications in a monorepo.
