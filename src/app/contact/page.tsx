export default function Contact() {
  return (
    <div className="pt-16 px-4">
      <div className="max-w-3xl mx-auto py-12">
        <h1 className="text-4xl font-bold mb-8">Contact Me</h1>
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2 font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800"
            />
          </div>
          <div>
            <label htmlFor="message" className="block mb-2 font-medium">
              Project Details
            </label>
            <textarea
              id="message"
              rows={6}
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
