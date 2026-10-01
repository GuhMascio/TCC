import { useState } from "react";
import { supabase } from "../../lib/supabase-client";

import BookFields from "./BookFields";
import AuthorFields from "./AuthorFields";
import PublisherFields from "./PublisherFields";
import CollectionFields from "./CollectionFields";

import { findOrCreatePublisher } from "../../services/publisherService";
import { findOrCreateAuthors } from "../../services/authorService";
import { findOrCreateGenres } from "../../services/genreService";

function BookForm() {
  // Book
  const [isbn, setISBN] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [edition, setEdition] = useState(1);
  const [language, setLanguage] = useState("");
  const [publicationYear, setPublicationYear] = useState(2026);

  // Genres
  const [genres, setGenres] = useState<string[]>([]);
  const [inputGenres, setInputGenres] = useState("");

  // Author
  const [authorFullName, setAuthorFullName] = useState<string[]>([""]);

  // Publisher
  const [publisherName, setPublisherName] = useState("");
  const [publisherCountry, setPublisherCountry] = useState("");

  // Collection
  const [numberBooksInserted, setNumberBooksInserted] = useState(1);
  const [bookConditions, setBookConditions] = useState<number[]>([
    0, // Irrecuperável
    0, // Precário
    0, // Desgastado
    0, // Regular
    0, // Bem conservado
    0, // Novo
  ]);

  async function sendForm(event: React.SubmitEvent) {
    event.preventDefault();

    const publisherId = await findOrCreatePublisher(
      publisherName,
      publisherCountry
    )

    const authorIds = await findOrCreateAuthors(
      authorFullName
    )

    const genreIds = await findOrCreateGenres(
      genres
    )

    const newBook = {
      // Foreign Keys
      publisher_id: publisherId,
      // Rows
      isbn: isbn,
      title: title,
      subtitle: subtitle,
      edition: edition,
      language: language,
      publication_year: publicationYear,
      //numberBooksInserted,      
    };

    const { data, error } = await supabase
      .from("Books")
      .insert(newBook)
      .select("id")
      .single();

    if (error) {
      console.error("Erro ao cadastrar:", error);
      return;
    }

    const bookId = data.id;

    const bookAuthors = authorIds.map((authorId) => ({
      book_id: bookId,
      author_id: authorId
    }))

    const bookGenres = genreIds.map((genreId) => ({
      book_id: bookId,
      genre_id: genreId
    }))

    const { error: bookAuthorsError } = await supabase
      .from("BookAuthors")
      .insert(bookAuthors);

    if (bookAuthorsError) {
      console.error("Error BookAuthors:", bookAuthorsError);
      return;
    }

    const { error: bookGenresError } = await supabase
      .from("BookGenres")
      .insert(bookGenres);

    if (bookGenresError) {
      console.error("Error BookGenres:", bookGenresError);
      return;
    }

    return;
  }

  return (
    <>
      <h1>Cadastro de Livros</h1>
      <br></br>
      <form onSubmit={sendForm}>
        {/* BOOKS FIELD */}
        <BookFields
          isbn={isbn}
          setISBN={setISBN}
          title={title}
          setTitle={setTitle}
          subtitle={subtitle}
          setSubtitle={setSubtitle}
          edition={edition}
          setEdition={setEdition}
          language={language}
          setLanguage={setLanguage}
          publicationYear={publicationYear}
          setPublicationYear={setPublicationYear}
          genres={genres}
          setGenres={setGenres}
          inputGenres={inputGenres}
          setInputGenres={setInputGenres}
        />

        {/* AUTHOR FIELD */}
        <AuthorFields
          authorFullName={authorFullName}
          setAuthorFullName={setAuthorFullName}
        />

        {/* PUBLISHERS FIELD */}
        <PublisherFields
          publisherName={publisherName}
          setPublisherName={setPublisherName}
          publisherCountry={publisherCountry}
          setPublisherCountry={setPublisherCountry}
        />

        {/* COLLECTION FIELD */}
        <CollectionFields
          numberBooksInserted={numberBooksInserted}
          setNumberBooksInserted={setNumberBooksInserted}
          bookConditions={bookConditions}
          setBookConditions={setBookConditions}
        />

        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
      <br></br>
    </>
  );
}

export default BookForm;
