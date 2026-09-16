from sqlalchemy import Column, String, Float, Integer, Boolean, ForeignKey
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()

class Product(Base):
    __tablename__ = "products"

    product_id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    sku = Column(String, nullable=False)
    category = Column(String)
    unit_weight_g = Column(Float)
    price_inr = Column(Float)

    shelves = relationship("Shelf", back_populates="product")

class Shelf(Base):
    __tablename__ = "shelves"

    shelf_id = Column(String, primary_key=True, index=True)
    product_id = Column(String, ForeignKey("products.product_id"))
    current_stock = Column(Integer, default=0)
    reorder_threshold = Column(Integer, default=0)
    is_physical_node = Column(Boolean, default=False)

    product = relationship("Product", back_populates="shelves")
