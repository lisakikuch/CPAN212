import { useEffect, useState } from "react"

const Exp = () => {
  const [experience, setExperience] = useState([])

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await fetch("http://localhost:8000/getExp")
        if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`)

        const data = await response.json()
        setExperience(data || [])
      } catch (error) {
        console.log(error.message)
        setExperience([])
      }
    }

    fetchExperience()
  }, [])

  if (experience.length === 0) {
    return (
      <div>
        <h2>Professional Experience</h2>
        <p>Loading experience data...</p>
      </div>
    )
  }

  return (
    <div>
      <h2>Professional Experience</h2>
      {experience.map((item) => (
        <div key={item.id} className="experience-item">
          <h3>{item.company}</h3>
          <h4>{item.title}</h4>
          <div className="d-flex justify-content-between mb-2">
            <span className="duration">{item.duration}</span>
            <span className="location">{item.location}</span>
          </div>
          <div className="employment-type mb-2">{item.employmentType}</div>

          {item.skills && item.skills.length > 0 && (
            <div className="mt-2">
              {item.skills.map((skill, index) => (
                <span key={index} className="skills-tag">
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default Exp

