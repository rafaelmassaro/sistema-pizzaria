import { useState } from 'react';
import { FiRefreshCcw } from 'react-icons/fi'
import Head from "next/head"

import Modal from 'react-modal';

import styles from './styles.module.scss';

import { canSSRAuth } from "../../utils/canSSRAuth"

import { Header } from "../../components/Header"

import { setupAPIClient } from '../../services/api';

import { ModalOrder } from '../../components/ModalOrder';

type OrderProps = {
    id: string;
    table: string | number;
    status: boolean;
    draft: boolean;
    name: string | null;
}

interface HomeProps {
    orders: OrderProps[];
}

export type OrderItemProps = {
    id: string;
    amount: number;
    order_id: string;
    product_id: string;
    product: {
        id: string;
        name: string;
        description: string;
        price: string;
        banner: string;
    },
    order: {
        id: string;
        table: string | number;
        status: boolean;
        draft: boolean;
        name: string | null;
    }
}

export default function Dashboard({orders}: HomeProps){
    const [orderList, setOrderList] = useState(orders || []);

    const [modalItem, setModalItem] = useState<OrderItemProps[]>()
    const [modalVisible, setModalVisible] = useState(false)
    
    function handleModalClose(){
        setModalVisible(false);
    }


    async function handleOpenModal(id: string){
        const apiclient = setupAPIClient()

         const response = await apiclient.get("order/detail", {
             params: {
                 order_id: id,
             }
         })

         setModalItem(response.data);
         setModalVisible(true);
    }

    async function handleFinishItem(id: string){
        const apiClient = setupAPIClient();

        await apiClient.put('/order/finish', {
            order_id: id,
        })

        const response = await apiClient.get('/orders');
        setOrderList(response.data);

        setModalVisible(false);
    }

    async function handleRefreshOrder(){
        const apiclient = setupAPIClient();

        const response = await apiclient.get('/orders');

        setOrderList(response.data);
    }

    Modal.setAppElement("#__next")

    return(
        <>
            <Head>
                <title>Painel - Sujeito Pizzaria</title>
            </Head>

            <Header />

            <main className={styles.container}>
                <div className={styles.containerHeader}>
                    <h1>Últimos pedidos</h1>
                    <button onClick={handleRefreshOrder}>
                        <FiRefreshCcw size={25} color="#3fffa3" />
                    </button>
                </div>

                <article className={styles.listOrders}>

                    {orderList.length === 0 && (
                        <span className={styles.emptyList}>
                            Nenhum pedido aberto encontrado...
                        </span>
                    )}

                    {orderList.map((order) => (
                        <section key={order.id} className={styles.orderItem}>
                            <button onClick={() => handleOpenModal(order.id)}>
                                <div className={styles.tag}></div>
                                <span>Mesa {order.table}</span>
                            </button>
                        </section>    
                    ))}

                </article>
            </main>

            {modalVisible && (
                <ModalOrder
                     isOpen={modalVisible}
                     onRequestClose={handleModalClose}
                     order={modalItem}
                     handleFinishOrder={handleFinishItem}
                />
            )}
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get('/orders');

    return{
        props: {
            orders: response.data
        }
    }
})