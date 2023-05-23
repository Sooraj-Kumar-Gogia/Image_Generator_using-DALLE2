"use client"

import { useRef, useState} from 'react'
import { OPTIONS } from '../../lib/constants';
import Options from '../../components/options';


export default function Home() {

  const promptRef = useRef(); // Create a reference to the input element so we can append the properties to the input text (prompt)
  const [renderedImages, setRenderedImages] = useState([]); // Create a state to store the rendered images
  const [loading, setLoading] = useState(false); // Create a state to store the loading state

  const appendPrompt = (prompt) => {
    promptRef.current.value = promptRef.current.value.concat(", ", prompt);
  }

  const handleGenerateImage = async () => {
    console.log(promptRef.current.value);
    
    try {
      const resp = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: promptRef.current.value }),
      });

      if (!resp.ok) {
        throw new Error("Unable to generate the image");
      }

      const data = await resp.json();
      console.log(data);

      setRenderedImages(data.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }

  }


  return (
    <main className='container max-w-4xl mx-auto'>
      <section className='flex items-center gap-2 px-6 py-2'>
        <h2>Prompt</h2>
        <input
          type='text'
          className='w-full outline-none py-2 px-6 bg-gray-600 rounded-3xl '
          placeholder='Enter Promot i.e. A man going down the street on bicycle'
          defaultValue="a boy running towards cold mountains"
          ref={promptRef}
        />
      </section>

      <seciton className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-6 py-6">
          <button onClick={()=>handleGenerateImage} className="hover:opacity-75  bg-lime-600 text-white py-2 px-6 rounded-3xl">Generate</button>

          {renderedImages.length === 0 && (
            <div className="bg-gray-600 aspect-square flex items-center justify-center">
              Image will show up here
            </div>
          )}

          {renderedImages.map((image) => {
            return <img key={image.url} src={image.url} />;
          })}
        </div>


        <div className='py-6 px-5'>
          <h2>Other Options</h2>
          {OPTIONS.map((option) => (
            <Options
              key={option.title}
              title={option.title}
              values={option.values}
              onAppend={appendPrompt}
            />

          ))}

        </div>


      </seciton>


    </main>
  )
}
