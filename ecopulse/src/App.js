import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { CheckIcon } from '@heroicons/react/20/solid'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [apiKey, setApiKey] = useState('');
  const [csvFile, setCsvFile] = useState(null);
  const [serverFile, setServerFile] = useState(null);
  const [isBaselineLoading, setIsBaselineLoading] = useState(false);

  const handleEnter = async () => {
    const formData = new FormData();
    formData.append('file', csvFile);
    formData.append('fileName', csvFile.name);
    formData.append('apiKey', apiKey);
    setIsBaselineLoading(true);
    const res = await fetch('http://localhost:5000/api/predict', {
      mode: 'cors',
      method: 'POST',
      cache: 'no-cache',
      body: formData,
    }).then((res) => res.json());
    setIsBaselineLoading(false);
    setServerFile(res.filename)
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCsvFile(file);
  };

  return (
    <div className="bg-white">

      <main className="isolate">
        {/* Hero section */}
        <div className="relative pt-14">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-green-400 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
  
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              EcoPulse
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              By: Cyclic Geese
            </p>
          </div>
   
        </div>
        <div className='px-6'>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Enter your OpenAI API key
          </label>
          <div className="mt-2">
            <input
              onChange={(e) => setApiKey(e.target.value)}
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="csvFile" className="block text-sm font-medium leading-6 text-gray-900">
              Upload CSV File
            </label>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <button
            className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
            onClick={handleEnter}
            disabled={isBaselineLoading}
          >
            {isBaselineLoading ? 'Loading...' : 'Enter'}
          </button>

          {isBaselineLoading && (
            <div className="mt-4">
              <p className="text-sm text-gray-500">
                Baseline model loading... please do not refresh the page.
              </p>
            </div>
          )}
          {!isBaselineLoading && serverFile && (
            <div className="mt-4">
              <p className="text-sm text-gray-500">
                Baseline model loaded! Download your file{' '}
                <a
                  href={`http://localhost:5000/api/download/${serverFile}`}
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  here
                </a>
              </p>
            </div>
          )
          }
        </div>
      </main>

      {/* Footer */}
      <div className="mx-auto mt-32 max-w-7xl px-6 lg:px-8">
        <footer
          aria-labelledby="footer-heading"
          className="relative border-t border-gray-900/10 py-24 sm:mt-56 sm:py-32"
        >
          <h2 id="footer-heading" className="sr-only">
            Footer
          </h2>
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Thank you to AI EarthHack for inspiring and supporting this project</h2>

        </footer>
      </div>
    </div>
  )
}

