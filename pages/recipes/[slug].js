import { useState } from 'react';
import {useRouter} from 'next/router';
import sanityClient  from '../../lib/sanity';
import {PortableText} from '@portabletext/react';
import {usePreviewSubscription, urlFor} from '../../lib/sanity';

const recipeQuery=`*[_type=="recipe" && slug.current==$slug][0]{

    _id,
    name,
    slug,
    mainImage{
      asset-> {
        _id,
        url
      }
    },
    ingredient[]{
        unit,
        wholeNumber,
        fraction,
        ingredient->{
            name
        }
    },
    instructions
    likes
    }`;
export default function OneRecipe({data,preview}){

const router=useRouter()


if (router.isFallback) {
  return <div>Loading...</div>
}


const{data:recipe}=usePreviewSubscription(recipeQuery,{
  params:{slug:data.recipe?.slug.current},
  initialData:data,
  enabled:preview
});

  const [likes,setLikes]=useState(data?.recipe?.likes);

  const addLike= async()=>{
    const res =await fetch("/api/handle-like",{
      method:"POST",
      body:JSON.stringify({_id:recipe._id}),
    }).catch((error)=> console.log(error));
    const data= await res.json();

    setLikes(data.likes);
  };
  
    return(
        <article className="recipe">
            <h1>{recipe.name}

            <button className="Like-button"onClick={addLike}>{likes}💖</button>
                <main className="content">
                    <img src={urlFor(recipe?.mainImage).url()} alt={recipe.name}/>
                    <div className="breakdow">
                        <ul className="ingredients"> 
                            {recipe.ingredient?.map((ingredient)=>
                            <li key={ingredient._key} className="ingredient">
                                {ingredient?.wholeNumber}
                                {ingredient?.fraction}
                                {""}
                                {ingredient?.unit}
                                <br/>
                                {ingredient?.ingredient?.name}
                            </li>
                            )}
                            
                        </ul>
                            <PortableText blocks={recipe?.instruction} className="instructions"/>
                    </div>
                </main>
            </h1>
        </article>
    );
}


export async function getStaticPaths() {
    const paths = await sanityClient.fetch(
      `*[_type == "recipe" && defined(slug.current)]{
        "params":{
          "slug":slug.current
        }
      }`
      );
    return {
      paths,
      fallback: true,
    };
  }

  export async function getStaticProps({params}) {
    const{slug}=params;
    const recipe = await sanityClient.fetch(recipeQuery,
      {slug});
    
  
    return {
      props: {
        data: {recipe},
       preview:true
      }
    };
  }

