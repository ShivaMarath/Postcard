import { AppBar } from './AppBar'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div>
        <AppBar/>
         <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white text-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          About Postcards
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
          A Minimal Blog by Shiva Marath
        </p>

        <div className="prose dark:prose-invert">
          <p className="mb-4">
            Welcome to Postcards – my first full-stack project as a developer.
          </p>

          <p className="mb-4">
            This blog represents my initial exploration into web development, combining frontend design with backend functionality. While simple in its current form, I see it as a living project that will grow alongside my skills.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">What to Expect:</h2>
          <ul className="list-disc pl-6 mb-6 space-y-1">
            <li>A clean, distraction-free reading experience</li>
            <li>Basic blogging functionality (for now)</li>
            <li>Progressive improvements over time</li>
          </ul>

          <p className="mb-6">
            As I continue learning, I'll be implementing new features and refining the experience. Your patience with this work-in-progress is appreciated!
          </p>

          <p className="mb-6">
            For feedback or collaboration, reach out at{" "}
            <a 
              href="mailto:shivamarath2005@gmail.com" 
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              shivamarath2005@gmail.com
            </a>.
          </p>

          <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic text-gray-600 dark:text-gray-300">
            "The expert in anything was once a beginner."
          </blockquote>
        </div>

        <div className="mt-8">
          <Link 
            to="/" 
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
    </div>
  )
}

export default About