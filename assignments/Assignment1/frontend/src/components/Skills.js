import { useEffect, useState } from "react"

const Skills = () => {
  const [skills, setSkills] = useState({})

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("http://localhost:8000/getSkills")
        if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`)

        const data = await response.json()
        setSkills(data || {})
      } catch (error) {
        console.log(error.message)
        setSkills({})
      }
    }

    fetchSkills()
  }, [])

  const renderSkillsList = (skillsList) => {
    if (!skillsList || skillsList.length === 0) {
      return <p>No skills available</p>
    }

    return (
      <div className="d-flex flex-wrap">
        {skillsList.map((skill, index) => (
          <span key={index} className="skills-tag">
            {skill}
          </span>
        ))}
      </div>
    )
  }

  if (!skills.technicalSkills) {
    return (
      <div>
        <h2>Skills</h2>
        <p>Loading skills data...</p>
      </div>
    )
  }

  return (
    <div>
      <h2>Skills</h2>

      <h3>Programming Languages</h3>
      {renderSkillsList(skills.technicalSkills?.programmingLanguages)}

      <h3>Backend Development</h3>
      {renderSkillsList(skills.technicalSkills?.backendDevelopment)}

      <h3>Frontend Development</h3>
      {renderSkillsList(skills.technicalSkills?.frontendDevelopment)}

      <h3>Relevant Skills</h3>
      {renderSkillsList(skills.technicalSkills?.relevantSkills)}

      <h3>Languages</h3>
      {renderSkillsList(skills.softSkills)}
    </div>
  )
}

export default Skills

