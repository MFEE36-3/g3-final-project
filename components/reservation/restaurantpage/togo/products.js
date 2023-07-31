import React from 'react'
import togocards from '@/data/reservation/togocards.json'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import style from '@/styles/reservation/style.module.css'
import Link from "next/link";

export default function Products({ category }) {

    const filterData = togocards.datas.filter((v) => v.category === category);
    return (
        <>
            <div className={style.togomain}>
                <div className={style.togocontent}>
                    {filterData.map((v) => {
                        return (
                            <Card
                                className={`${style.card2}`}
                                key={v.id}
                            >
                                <div className={style.carddiv}>
                                    <Card.Img
                                        variant="top"
                                        src="../../reservation/respic.jpeg"
                                        className={`${style.cardimg}`}
                                    />
                                    <div className={style.togocardtext}>查看餐點</div>
                                </div>

                                <Card.Body>
                                    <Card.Title>{v.name}</Card.Title>
                                    <Card.Text>${v.price}</Card.Text>
                                    <div className="d-flex align-item-center justify-content-between">
                                        <Button
                                            style={{
                                                width: '100%',
                                                fontSize: '12px',
                                                background: '#911010',
                                                borderRadius: 20,
                                                border: 0,
                                                color: 'white',
                                                padding: '5px',
                                            }}
                                        >
                                            加入購物車
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
