import { Container, Form, Button } from "react-bootstrap";

const Contact = () => {
  return (
    <Container className="contact-section">
      <h2>Contact</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Control type="text" placeholder="Name" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control type="email" placeholder="Email" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control as="textarea" rows={4} placeholder="Message" />
        </Form.Group>

        <Button type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Contact;