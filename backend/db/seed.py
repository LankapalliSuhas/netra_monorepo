import asyncio
import json
import os
from sqlalchemy.ext.asyncio import AsyncSession
from db.models import Base, Product, Shelf
from db.session import engine, AsyncSessionLocal

async def seed_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
    
    async with AsyncSessionLocal() as db:
        # Load products from JSON
        seed_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'seed_products.json')
        with open(seed_path, 'r') as f:
            products_data = json.load(f)
        
        # We need 50 virtual shelves, so let's generate 45 more dummy products
        for i in range(6, 51):
            products_data.append({
                "product_id": f"prod_{i:03d}",
                "name": f"Dummy Item {i}",
                "sku": f"DUMMY-{i}",
                "category": "Misc",
                "unit_weight_g": 100.0,
                "price_inr": 50.0,
                "default_shelf_id": f"virtual_shelf_{i:02d}",
                "stock_quantity": 20,
                "reorder_threshold": 5
            })
            
        for p_data in products_data:
            product = Product(
                product_id=p_data["product_id"],
                name=p_data["name"],
                sku=p_data["sku"],
                category=p_data["category"],
                unit_weight_g=p_data["unit_weight_g"],
                price_inr=p_data["price_inr"]
            )
            db.add(product)
            
            shelf_id = p_data.get("default_shelf_id") or f"virtual_shelf_{p_data['product_id']}"
            is_physical = (shelf_id == "esp32_shelf_01")
            
            shelf = Shelf(
                shelf_id=shelf_id,
                product_id=p_data["product_id"],
                current_stock=p_data["stock_quantity"],
                reorder_threshold=p_data["reorder_threshold"],
                is_physical_node=is_physical
            )
            db.add(shelf)
            
        await db.commit()
        print("Database seeded with 50 products and shelves.")

if __name__ == "__main__":
    asyncio.run(seed_db())
