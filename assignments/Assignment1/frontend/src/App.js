"use client"

import { Container, Row, Col } from "react-bootstrap"
import Overview from "./components/Overview"
import Exp from "./components/Exp"
import Edu from "./components/Edu"
import Skills from "./components/Skills"
import Contact from "./components/Contact"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

export default function App() {
  return (
    <div className="App">
      <Container fluid className="p-0">
        <div className="header-bg py-5">
          <Container>
            <Overview />
          </Container>
        </div>
        <Container className="py-5">
          <Row className="g-4">
            <Col xs={12} md={8} lg={8}>
              <div className="content-section mb-4">
                <Exp />
              </div>
              <div className="content-section">
                <Edu />
              </div>
            </Col>
            <Col xs={12} md={4} lg={4}>
              <div className="content-section">
                <Skills />
              </div>
              <div className="content-section">
                <Contact />
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  )
}

