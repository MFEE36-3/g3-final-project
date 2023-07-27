import React from 'react';
import styles from './kcard.module.css';
export default function Kcard({ img, title, p }) {
  return (
    <>
      <div className="container">
        <div classNameName="card mb-3 ">
          <div className="row g-0 mb-3 mt-5">
            <div className="col-md-4">
              <img src={img} className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-md-8 bg-white">
              <div className="card-body ">
                <h5 className="card-title ps-5 pt-4">{title}</h5>
                <p className="card-text">
                  <small className="text-body-secondary ps-5">{p}</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
