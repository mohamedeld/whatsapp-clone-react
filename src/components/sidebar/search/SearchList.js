import React from 'react'
import Contact from './Contact'

export default function SearchList({searchResult,setSearchResult}) {
  return (
    <>
      <div className="w-full convos scrollbar">
      <div>
        {/*Heading*/}
        <div className="flex flex-col px-8 pt-8">
          <h1 className="font-extralight text-md text-green_2">Contacts</h1>
          <span className="w-full mt-4 ml-10 border-b dark:border-b-dark_border_1"></span>
        </div>
        {/*Results*/}
        <ul>
          {searchResult &&
            searchResult.map((user) => (
              <Contact
                contact={user}
                key={user._id}
                setSearchResults={setSearchResult}
              />
            ))}
        </ul>
      </div>
    </div>
    </>
  )
}
