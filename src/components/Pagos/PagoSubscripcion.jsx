import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import visa from '../../img/vis.jpg'
import mastercard from '../../img/mastercard.png'
import { Navigate, useNavigate, useParams } from 'react-router';
import Loading from '../Loading';


const PagoSubscripcion = () => {

  const { authAction, auth } = useAuth()

  const id = new URLSearchParams(window.location.search).get('id');
  const interval = new URLSearchParams(window.location.search).get('interval');

  const [data, setData] = useState();
  const [plan, setPlan] = useState();
  const [subscription, setSubscription] = useState();

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchCard = async () => {
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        const response = await fetch(`http://iksadmin.iknesoft.in/iks-admin-back/iknesoftback/public/stripe/obtener/card/?id=${id}`, requestOptions)
        const result = await response.json();
        setData(result);
        console.log(result);

      }
      fetchCard();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        const response = await fetch(`http://iksadmin.iknesoft.in/iks-admin-back/iknesoftback/public/stripe/obtener/plan/?interval=${interval}`, requestOptions);
        const result = await response.json();
        setPlan(result);
        console.log(result);
        // console.log(plan.plan.amount);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPlan();
  }, []);




  const handlePago = async () => {
    setDisabled(true);

    const formdata = new FormData();
    formdata.append("email", auth.session.email);
    formdata.append("id", plan?.planId);
    formdata.append("cardId", data?.id);

    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    const response = await fetch("http://iksadmin.iknesoft.in/iks-admin-back/iknesoftback/public/stripe/charge/subscription/", requestOptions);
    const result = await response.json();
    setSubscription(result);
    console.log(result);
    if (result) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate(`/perfil`)
      }, 2000);
    }


  }


  if (loading) {
    return <Loading />
  }
  // console.log(paymentMethodId);

  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", " Julio",
    "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  const monthCardExp = monthNames[data?.card.exp_month - 1];

  const name = data?.card?.brand == 'visa' ? visa : mastercard;
  console.log(name);








  return (
    <main>
      <div className='flex justify-center items-center my-10  '>
        <div className='flex-1 bg-white mx-3'>
          <section>
            <div className=" rounded overflow-hidden shadow-lg m-10">
              <div className='text-center text-5xl'>{plan?.plan?.amount}mx/{plan?.plan?.interval === "year" ? "Año" : "Mensual"}  </div>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Tu suscripción {plan?.plan?.interval === "year" ? "anual" : "mensual"}  de hosting</div>
                <p className="text-gray-700 text-base">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                </p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#hosting</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#iknesoft</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#verano</span>
              </div>
            </div>
          </section>
        </div>
        <div className='flex-1 mx-10 rounded overflow-hidden shadow'>
          <section className=''>
            <div className=" rounded overflow-hidden shadow m-10">
              <div className="px-6 py-4 flex items-center">
                <div className="mx-3 text-center items-center">
                  <img src={name} alt="card" className='w-12 h-8' />
                </div>
                <div>
                  <div>{data?.card?.brand}...{data?.card?.last4}</div>
                  <div>Vence en {monthCardExp} de {data?.card?.exp_year} </div>
                </div>
              </div>
            </div>
          </section>



          <section>
            <div className=" rounded overflow-hidden shadow m-10">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Tu correo: {auth.session.email} </div>
              </div>
            </div>
          </section>



          <div className='flex justify-center items-center my-3'>
            <button className='bg-green-midnight hover:bg-green-500 text-white w-40 rounded-md shadow-lg overflow-hidden h-10'
              onClick={handlePago} disabled={disabled}

            >Pagar</button>
          </div>

        </div>
      </div>
    </main>
  )
}

export default PagoSubscripcion