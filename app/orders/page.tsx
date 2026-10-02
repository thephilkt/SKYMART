import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, CheckIcon, TruckIcon } from "@/components/icons";
import { products } from "@/lib/mock-data";
import { formatPrice } from "@/lib/format";

const demoOrders = [
  { id: "SKY-260928-H2M8", status: "กำลังจัดส่ง", detail: "คาดว่าจะถึงพรุ่งนี้", icon: "truck", product: products[2], date: "28 ก.ย. 2026" },
  { id: "SKY-260914-K7P3", status: "สำเร็จแล้ว", detail: "ส่งถึงเมื่อ 16 ก.ย.", icon: "check", product: products[0], date: "14 ก.ย. 2026" },
];

export default function OrdersPage() {
  return <div className="page-shell orders-page"><div className="page-title"><div><h1>คำสั่งซื้อ</h1><p>ติดตามสิ่งที่กำลังเดินทางและย้อนดูรายการที่ผ่านมา</p></div></div><div className="order-tabs"><button className="is-active">ทั้งหมด</button><button>ที่ต้องชำระ</button><button>กำลังเตรียม</button><button>กำลังจัดส่ง</button><button>สำเร็จแล้ว</button></div><div className="order-list">{demoOrders.map((order) => <article className="order-card" key={order.id}><div className="order-card-head"><div><span>{order.date}</span><strong>{order.id}</strong></div><p className={order.icon === "truck" ? "status-blue" : "status-green"}>{order.icon === "truck" ? <TruckIcon size={18} /> : <CheckIcon size={18} />}{order.status}</p></div><div className="order-product"><Image alt="" height={112} src={order.product.image} width={112} /><div><span>{order.product.seller}</span><h2>{order.product.name}</h2><p>จำนวน 1 ชิ้น</p></div><strong>{formatPrice(order.product.price)}</strong></div><div className="order-card-foot"><p>{order.detail}</p><Link className="button button-secondary" href="#">ดูรายละเอียด <ArrowIcon size={17} /></Link></div></article>)}</div><p className="demo-disclaimer">รายการในหน้านี้เป็นข้อมูลจำลองสำหรับทดสอบ UI</p></div>;
}
