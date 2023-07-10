import React from 'react'
import togocards from '@/data/reservation/togocards.json'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function Products({category}) {

    const filterData = togocards.datas.filter((v) => v.category === category);
    return (
        <>
            <div className='d-flex justify-content-center'>
                <div className="d-flex justify-content-start row">
                    {filterData.map((v) => {
                        return (
                            <Card
                                className="m-2 co1-4 px-0"
                                style={{ width: '21%', border: 'none' }}
                                key={v.id}
                            >
                                <Card.Img
                                    variant="top"
                                    src="../../reservation/respic.jpeg"
                                    className="rounded-top-3"
                                />

                                <Card.Body>
                                    <Card.Title>{v.name}</Card.Title>
                                    <Card.Text>${v.price}</Card.Text>
                                    <div className="d-flex align-item-center justify-content-between">
                                        <Button
                                            style={{
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
