import { useEffect, useState } from "react"
import { Row, Col, Image } from "react-bootstrap"
import { Envelope, Linkedin, Github } from "react-bootstrap-icons"

const Overview = () => {
  const [overview, setOverview] = useState({})

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const response = await fetch("http://localhost:8000/getOverview")
        if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`)

        const data = await response.json()
        setOverview(data || {})
      } catch (error) {
        console.log(error.message)
        setOverview({})
      }
    }

    fetchOverview()
  }, [])

  if (!overview.name) {
    return <div className="text-center py-4">Loading profile information...</div>
  }

  return (
    <Row className="align-items-center">
      <Col md={4} className="text-center text-md-start mb-4 mb-md-0">
        {overview.imageUrl && (
          <Image src={overview.imageUrl || "/placeholder.svg"} alt={overview.name} className="profile-image" />
        )}
      </Col>
      <Col md={8}>
        <h1 className="display-4 fw-bold">{overview.name}</h1>
        <h2 className="fs-3 fw-light text-white mb-3">{overview.title}</h2>
        <p className="lead mb-4">{overview.description}</p>
        <p>{overview.introduction}</p>
        <div className="contact-links">
          {overview.email && (
            <a href={`mailto:${overview.email}`} aria-label="Email">
              <Envelope size={20} className="me-2" />
              {overview.email}
            </a>
          )}
          {overview.linkedIn && (
            <a href={overview.linkedIn} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={20} className="me-2" />
              LinkedIn
            </a>
          )}
          {overview.gitHub && (
            <a href={overview.gitHub} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github size={20} className="me-2" />
              GitHub
            </a>
          )}
        </div>
      </Col>
    </Row>
  )
}

export default Overview

