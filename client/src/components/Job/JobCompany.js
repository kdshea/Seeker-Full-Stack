import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import API_URL from '../../config.js'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import Spinner from '../Spinner.js'
import JobNav from './JobNav'
import  Card  from 'react-bootstrap/Card'
import { getToken } from '../helpers/auth.js'
import  Button  from 'react-bootstrap/Button'

const JobDetails = () => {
  const { jobId } = useParams()
  const [ company, setCompany ] = useState(null)
  const [ errors, setErrors ] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/companies/job${jobId}/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,  
          },
        })
        setCompany(data)
        console.log('data', data)
      } catch (error) {
        setErrors(error.message)
        console.log(error.message)
      }
    }
    getData()
  }, [])

  const deleteCompany = async (event, companyId) => {
    event.preventDefault()
    try {
      const { data } = await axios.delete(`${API_URL}/companies/${companyId}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log(data)
      navigate(`/add-job/${jobId}/company`)
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }

  return (
    <>
      <JobNav />
      <div>
        <Container>
          { company ?
            (company[0]
              ?
              <div className="kitchen-sink">
                <Card>
                  {/* <Card.Img variant="top" src="" /> */}
                  <Card.Body>
                    <Card.Title>{company[0].name}</Card.Title>
                    {/* <Card.Text>
                  Some quick example text to build on the card title and make up 
                    </Card.Text> */}
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                      <div>Industry</div>
                      <div>{company[0].industry}</div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div>Founded</div>
                      <div>{company[0].founded}</div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div>Location</div>
                      <div>{company[0].hq_location}</div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div>Size</div>
                      <div>{company[0].size}</div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div>Type</div>
                      <div>{company[0].type}</div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div>Website</div>
                      <div>{company[0].company_url}</div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div>Description</div>
                      <div>{company[0].description}</div>
                    </ListGroup.Item>
                  </ListGroup>
                  <Card.Body>
                    {/* <Link to={`/edit-company/job${company.job}/${company.id}`}><Button variant="primary">Edit</Button></Link> */}
                    <Link to={`/edit-company/job${company[0].job}/${company[0].id}`}>
                      <Button><i className="fa-solid fa-pen-to-square"></i></Button>
                    </Link>
                    <Button variant="danger" onClick={event => deleteCompany(event, company[0].id)}>
                      <i className="fa-solid fa-trash-can"></i>
                    </Button>
                  </Card.Body>
                </Card>
              </div>
              :
              <Link to={`/add-job/${jobId}/company`}><Button>Add Company</Button></Link>)
            :
            <h2 className="text-center">
              { errors ? 'Something went wrong. Please try again later' : <Spinner />}
            </h2>
          } 
        </Container>
      </div>
    </>
  )
}

export default JobDetails