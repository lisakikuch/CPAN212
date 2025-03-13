import { useEffect, useState } from "react"

const Edu = () => {
  const [education, setEducation] = useState([])

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await fetch("http://localhost:8000/getEdu")
        if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`)

        const data = await response.json()
        setEducation(data || [])
      } catch (error) {
        console.log(error.message)
        setEducation([])
      }
    }

    fetchEducation()
  }, [])

  if (education.length === 0) {
    return (
      <div>
        <h2>Education</h2>
        <p>Loading education data...</p>
      </div>
    )
  }

  return (
    <div>
      <h2>Education</h2>
      {education.map((item) => (
        <div key={item.id} className="education-item">
          <h3>{item.school}</h3>
          <h4>{item.degree}</h4>
          <div className="duration">{item.year}</div>
        </div>
      ))}
    </div>
  )
}

export default Edu

