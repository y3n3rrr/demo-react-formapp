import React, { useState } from 'react'
import axios from 'axios'

export default function Kayit() {
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [username, setUsername] = useState("")


  const fetchData = async () => {
    const response = await axios.post("https://localhost:7089/WeatherForecast", {
      firstname,
      lastname,
      username
    },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData()
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="col-md-4 mb-3">
          <label htmlFor="validationServer01">Adınız</label>
          <input type="text" className={`form-control ${firstname != "" ? "is-valid" : "is-invalid"}`} id="validationServer01" placeholder="Adınızı giriniz" defaultValue="" required onChange={(e) => setFirstname(e.target.value)} />
          <div className="invalid-feedback">
            {firstname != "" ? "" : "Adinizi giriniz"}
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="validationServer02">Soy adınız</label>
          <input type="text" className={`form-control ${lastname != "" ? "is-valid" : "is-invalid"}`} id="validationServer02" placeholder="Soy adınızı giriniz" defaultValue="" required onChange={(e) => setLastname(e.target.value)} />
          <div className="invalid-feedback">
            {firstname != "" ? "" : "Soyadinizi giriniz"}
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="validationServerUsername">Kullanıcı adı</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroupPrepend3">@</span>
            </div>
            <input type="text" className={`form-control ${username != "" ? "is-valid" : "is-invalid"}`} id="validationServerUsername" placeholder="Kullanıcı adı" aria-describedby="inputGroupPrepend3" required onChange={(e) => setUsername(e.target.value)} />
            <div className="invalid-feedback">
              {username != "" ? "" : "Kullanici adinizi giriniz"}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="form-row">
      <div className="col-md-6 mb-3">
        <label htmlFor="validationServer03">İl</label>
        <input type="text" className="form-control" id="validationServer03" placeholder="İl" required />
        <div className="invalid-feedback">
          Please provide a valid city.
        </div>
      </div>
      <div className="col-md-3 mb-3">
        <label htmlFor="validationServer04">İlçe</label>
        <input type="text" className="form-control" id="validationServer04" placeholder="İlçe" required />
        <div className="invalid-feedback">
          Please provide a valid state.
        </div>
      </div>
      <div className="col-md-3 mb-3">
        <label htmlFor="validationServer05">Posta Kodu</label>
        <input type="text" className="form-control" id="validationServer05" placeholder="Posta kodu" required />
        <div className="invalid-feedback">
          Please provide a valid zip.
        </div>
      </div>
    </div>
    <div className="form-group">
      <div className="form-check">
        <input className="form-check-input" type="checkbox" defaultValue id="invalidCheck3" required />
        <label className="form-check-label" htmlFor="invalidCheck3">
          Okudum, onaylıyorum
        </label>
        <div className="invalid-feedback">
          You must agree before submitting.
        </div>
      </div>
    </div> */}
      <button className="btn btn-primary" type="submit" >Kaydet</button>
    </form>
  )
}
