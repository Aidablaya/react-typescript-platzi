import { useState, useEffect } from "react";
import type { NextPage } from "next";
import type { MouseEventHandler } from "react";
import Head from "next/head"; 
import { random } from "lodash";
import { LazyImage } from "../components/RandomFox";

//generate a random function between 1 and 123
const myRandom = () => random(1, 123); 

//generate simple unique id
const generateId = () => Math.random().toString(36).substr(2, 9);



const Home: NextPage = () => {
  const [images, setImages] = useState <Array<IFoxImageItem>>([]);

const addNewFox:MouseEventHandler<HTMLButtonElement> = (event) => {
  const newImageItem: IFoxImageItem = {
    id: generateId(),
    url: `https://randomfox.ca/images/${myRandom()}.jpg`
  }
 
  setImages([...images, newImageItem ]);
  

  };

  useEffect(() => {
    if (window.plausible) {
      window.plausible("add_fox");
    }
  }, []);

  return (
    <div>
      <Head>
        <title>🦊 Random Fox</title>
        <meta name="description" content="Generate by Platzi" />
        <link rel="icon" href="/favicon.ico" />
        <script
          defer
          data-domain="yourdomain.com"
          src="https://plausible.io/js/script.js"
        ></script>
      </Head>
      <header className="flex items-center justify-center">
        <h1 className="text-4xl m-6"> 🦊 RANDOM FOX</h1>

        <button onClick={addNewFox} className="px-6 h-12 uppercase font-semibold tracking-wider border-2 border-black bg-amber-600 text-black" type="submit" >Add new fox</button>
      </header>
      <main className="space-x-3 flex items-center text-sm font-medium">
        
          <div className="flex flex-wrap pl-6 text-center w-full" >
            {images.map(({id, url}, index) => (
              <div key={id} className="p-4 flex-4  mx-auto">
                <LazyImage 
                src={url}
                title="Random Fox"
                width={320} 
                height="auto"
                className="rounded bg-gray-300" 
                onClick={()=> console.log("hey")}
                onLazyLoad={(img)=> {
                  console.log(`Image #${index + 1} cargada. Nodo:`, img);
                }}
                />
              </div>
          
        ))}
        </div>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
