import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL, APIHandler } from '../config'

export default function Kayit() {
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [username, setUsername] = useState("")
  const [alertType, setAlertType] = useState("")
  const [alertMessage, setAlertMessage] = useState("")
  const [userList, setUserList] = useState([])

  const postData = async () => {
    try {
      const newUser = {
        firstname,
        lastname,
        username
      }

      const response = await axios.post(`${BASE_URL}/WeatherForecast`, newUser,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        })

      if (response.status == 200) {
        setAlertType("success")
        setAlertMessage("Kullanici kaydi olusturuldu.")
        setUserList([...userList, newUser])
      }

    } catch (error) {
      setAlertType("danger")
      setAlertMessage(error.response.data)
    }

  }

  const getUserList = async () => {
    const response = await axios.get(`${BASE_URL}/WeatherForecast`, {},
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    console.log('TUM LISTE response.data', response.data)
    setUserList(response.data)
  }

  const deleteUser = async (Username) => {
    const response = await axios.delete(`${BASE_URL}/WeatherForecast?username=${Username}`)
    getUserList()
  }

  const renderAlert = () => {
    if (alertType) {
      return (
        <div class={`alert alert-${alertType}`} role="alert">
          {alertMessage}
        </div>
      )
    }

  }

  const renderUserList = () => {
    return userList.map((val, i) => (
      <tr>
        <th scope="row">{i}</th>
        <td>{val.firstname}</td>
        <td>{val.lastname}</td>
        <td>{val.username}</td>
        <td><button type="button" className="btn btn-danger" onClick={() => deleteUser(val.username)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
          <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
        </svg></button></td>
      </tr>
    ))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    postData()
  }

  useEffect(() => {
    getUserList()
  }, [])




  return (
    <div>
      <form onSubmit={handleSubmit}>
        {renderAlert()}
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
        <button className="btn btn-primary" type="submit" >Kaydet</button>
      </form>
      <div style={{ paddingTop: 50 }}>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Ad</th>
              <th scope="col">Soyad</th>
              <th scope="col">Kullanıcı Adı</th>
            </tr>
          </thead>
          <tbody>

            {renderUserList()}

          </tbody>
        </table>
      </div>
    </div>
  )
}
