import "./index.css";
import { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2'

function Home() {

    let [charge, setCharge] = useState(false);
    let [inventory, setInventory] = useState(false);
    let [max, setMax] = useState(false);

    let [loding, setLoading] = useState(false);

    let [code, setCode] = useState(0);
    let [chargesend, setChargeSend] = useState(0);

    function inventory_btn() {
        setInventory(true);
        setCharge(false);
        setMax(false);
    }

    function charge_btn() {
        setInventory(false);
        setCharge(true);
        setMax(false);
    }

    function max_btn() {
        setInventory(false);
        setCharge(false);
        setMax(true);
    }

    function CodeInput(event) {
        setCode(event.target.value);
    }

    function ChargeInput(event) {
        setChargeSend(event.target.value);
    }


    function inventory_req() {
        setLoading(true);

        axios.get(`http://localhost:4000/charge/${code}`).then((res) => {
            setLoading(false);
            if (res.data.status) {
                console.log(res.data);
                Swal.fire(
                    'عملیات موفق',
                    `موجودی کارت شما : ${res.data.card_charge} تومان `,
                    'success'
                );
            } else {
                Swal.fire(
                    'عملیات ناموفق',
                    res.data.message,
                    'error'
                );
            }

        }).catch((error) => {
            Swal.fire(
                'عملیات ناموفق',
                'error'
            );
        });
    }

    function charge_req() {
        setLoading(true);
        axios.put(`http://localhost:4000/charge/${code}`, { charge: chargesend }).then((res) => {
            setLoading(false);
            if (res.data.status) {
                Swal.fire(
                    'عملیات موفق',
                    `موجودی کارت شما : ${res.data.new_charge} تومان `,
                    'success'
                );
            } else {
                Swal.fire(
                    'عملیات ناموفق',
                    res.data.message,
                    'error'
                );
            }

        }).catch((error) => {
            Swal.fire(
                'عملیات ناموفق',
                'error'
            );
        });
    }

    function max_req() {
        setLoading(true);

        axios.put(`http://localhost:4000/max/${code}`).then((res) => {
            setLoading(false);
            if (res.data.status) {
                Swal.fire(
                    'عملیات موفق',
                    `به کارت شما : ${res.data.chargeing} تومان  اضافه شد`,
                    'success'
                );
            } else {
                Swal.fire(
                    'عملیات ناموفق',
                    res.data.message,
                    'error'
                );
            }

        }).catch((error) => {
            Swal.fire(
                'عملیات ناموفق',
                'error'
            );
        });
    }

    return (
        <>
            <span className="text-white mt-[100px] text-lg block text-center">سامانه کارت هوشمند شهروندی شهر شیراز</span>

            <section className="w-[70%] h-auto  grid grid-cols-3  mx-auto mt-5 gap-5">
                <button onClick={e => inventory_btn()} className={`${inventory == true ? 'bg-[#8BE8E5]' : ''} w-full h-[100px] col-span-1 flex flex-col justify-around items-center rounded-md border hover:bg-[#8BE8E5] transition-all`}>
                    <span>موجودی کارت</span>
                </button>
                <button onClick={e => charge_btn()} className={`${charge == true ? 'bg-[#8BE8E5]' : ''} w-full h-[100px] col-span-1 flex flex-col justify-around items-center rounded-md border hover:bg-[#8BE8E5] transition-all`}>
                    <span>شارژ کارت</span>
                </button>
                <button onClick={e => max_btn()} className={`${max == true ? 'bg-[#8BE8E5]' : ''} w-full h-[100px] col-span-1 flex flex-col justify-around items-center rounded-md border hover:bg-[#8BE8E5] transition-all`}>
                    <span>پرکردن کارت</span>
                </button>
            </section>


            <section className={`${inventory == true ? 'flex' : 'hidden'} flex-col justify-start items-center  w-6/12 h-auto mx-auto mt-5`}>


                <input type="number" onChange={e => CodeInput(e)} placeholder="کد کارت خود را وارد کنید " className="w-[80%] h-[50px] mx-auto mt-4 text-center border-none outline-none rounded-md" />
                <button onClick={e => inventory_req()} className="h-[50px] bg-[#C8E4B2] px-5 mt-5 rounded-md">ارسال اطلاعات</button>


            </section>

            <section className={`${charge == true ? 'flex' : 'hidden'} flex-col justify-start items-center  w-6/12 h-auto mx-auto mt-5`}>


                <input onChange={e => CodeInput(e)} type="number" placeholder="کد کارت خود را وارد کنید " className="w-[80%] h-[50px] mx-auto mt-4 text-center border-none outline-none rounded-md" />
                <input type="number" onChange={e => ChargeInput(e)} placeholder="میزان شارژ کارت خود را وارد کنید" className="w-[80%] h-[50px] mx-auto mt-4 text-center border-none outline-none rounded-md" />
                <button onClick={e => charge_req()} className=" h-[50px] bg-[#C8E4B2] px-5 mt-5 rounded-md">ارسال اطلاعات</button>


            </section>

            <section className={`${max == true ? 'flex' : 'hidden'} flex-col justify-start items-center  w-6/12 h-auto mx-auto mt-5`}>


                <input onChange={e => CodeInput(e)} type="number" placeholder="کد کارت خود را وارد کنید " className="w-[80%] h-[50px] mx-auto mt-4 text-center border-none outline-none rounded-md" />
                <button onClick={e => max_req()} className=" h-[50px] bg-[#C8E4B2] px-5 mt-5 rounded-md">ارسال اطلاعات</button>


            </section>


            <div className={`${loding == true ? 'flex' : 'hidden'} h-32 mx-auto mt-5  justify-center items-center text-white`}>
                <div role="status">
                    <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                </div>
                <span>درحال انجام عملیات</span>
            </div>

        </>
    )
}


export default Home;