import React from "react";
import clsx from "clsx";
//@ts-expect-error
import AtomSpinner from "@bit/bondz.react-epic-spinners.atom-spinner";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

const validateSlug = async (value: string | undefined) => {
  const {
    data: { slug: isValidSlug },
  } = await axios.put<{ slug: string }>("https://472.se", {
    slug: value,
  });
  return isValidSlug;
};

const CreateURLSlug = async (url: string, slug?: string) =>
  axios.post("https://472.se", { url, slug });

export const UrlForm = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = async ({ url, slug }: { url: string; slug?: string }) => {
    CreateURLSlug(url, slug).then(({ data }) => {
      history.push("/success", data);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <label className="block text-lg font-medium text-gray-700 mt-2">
        Long URL
      </label>
      <input
        type="url"
        placeholder="https://........."
        className={clsx(
          "mr-4 my-2 px-5 py-3 outline-none focus:ring text-gray-700 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm border border-gray-300 rounded-md",
          {}
        )}
        {...register("url", { required: true })}
      />

      <label className="block text-lg font-medium text-gray-700 mt-2">
        Customize slug
      </label>
      <div className="my-2 flex rounded-md shadow-sm">
        <span className="inline-flex items-center px-5 py-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
          472.se
        </span>

        <input
          type="text"
          placeholder="slug"
          className={clsx(
            "focus:ring outline-none focus:ring-teal-500 focus:border-teal-500 border flex-1 py-3 px-4 block w-full rounded-none rounded-r-md border-gray-300 text-gray-700",
            {
              "ring ring-red-500 border-red-500 focus:ring-red-500 focus:border-red-500":
                errors.slug,
            }
          )}
          {...register("slug", {
            minLength: 1,
            maxLength: 2000,
            required: false,
            validate: async (value) => validateSlug(value),
          })}
        />
      </div>
      <pre className="text-red-500">
        {errors.slug ? "Slug already taken" : ""}
      </pre>

      <button
        disabled={errors.slug}
        type="submit"
        className="flex justify-center px-4 py-3 mt-4 border font-bold disabled:bg-gray-500 disabled:cursor-not-allowed text-lg border-transparent shadow-sm font-medium rounded-md bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
      >
        {isSubmitting ? <AtomSpinner color="#ffffff" size="30" /> : "Shorten"}
      </button>
    </form>
  );
};

// export const UrlForm = () => {
//   const history = useHistory();
//   return (
//     <div>
//       <Formik
//         initialValues={{ url: "", slug: "" }}
//         // validationSchema={UrlSchema}
//         onSubmit={({ url, slug }) => {
//           CreateURLSlug(url, slug)
//             .then(({ data }) => {
//               history.push("/success", data);
//             })
//             .catch((error) => {
//               history.push("/error", error);
//             });
//         }}
//       >
//         {({ isSubmitting, errors: { url } }) => (
//           <Form className="flex flex-col">
//             <label className="block text-lg font-medium text-gray-700">
//               Long URL
//             </label>
//             <Field
//               type="text"
//               name="url"
//               className={clsx(
//                 "mr-4 my-2 px-5 py-3 outline-none focus:ring text-gray-700 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm border border-gray-300 rounded-md",
//                 {
//                   "ring ring-red-500 border-red-500 focus:ring-red-500 focus:border-red-500":
//                     url,
//                 }
//               )}
//             />
//             <ErrorMessage
//               name="url"
//               component="div"
//               className="text-red-500 mb-3"
//             />

//             <label className="block text-lg font-medium text-gray-700 mt-2">
//               Customize slug
//             </label>
//             <div className="my-2 flex rounded-md shadow-sm">
// <span className="inline-flex items-center px-5 py-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
//   472.se
// </span>
//               <Field
//                 type="text"
//                 name="slug"
//                 validate={validate}
//                 className="focus:ring outline-none focus:ring-teal-500 focus:border-teal-500 border flex-1 py-3 px-4 block w-full rounded-none rounded-r-md border-gray-300 text-gray-700"
//               />
//             </div>
//             <ErrorMessage
//               name="slug"
//               component="div"
//               className="text-red-500 mb-3"
//             />

//             <button
//               type="submit"
//               disabled={url !== undefined}
//               className="flex justify-center px-4 py-3 mt-5 border font-bold disabled:bg-gray-500 disabled:cursor-not-allowed text-lg border-transparent shadow-sm font-medium rounded-md bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
//             >
//               {isSubmitting ? (
//                 <AtomSpinner color="#ffffff" size="30" />
//               ) : (
//                 "Shorten"
//               )}
//             </button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// import { useState } from "react";

// export const Form = () => {
//   const [url, setUrl] = useState<string>("");

//   return (
//     <form
//       className="flex flex-col"
//       onSubmit={(e) => {
//         e.preventDefault();
//         alert(url);
//       }}
//     >
//       <label className="block text-lg font-medium text-gray-700">
//         Long URL
//       </label>
//       <input
//         type="text"
//         className="mr-4 my-2 px-5 py-3 outline-none focus:ring text-gray-700 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm border border-gray-300 rounded-md"
//         required={true}
//         value={url}
//         onChange={(e) => setUrl(e.target.value)}
//         placeholder="Shorten your link"
//       ></input>
//       <label className="block text-lg font-medium text-gray-700 mt-3">
//         Customize URL
//       </label>
//       <div className="my-2 flex rounded-md shadow-sm">
//         <span className="inline-flex items-center px-5 py-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
//           472.se
//         </span>
//         <input
//           type="text"
//           name="company-website"
//           id="company-website"
//           className="focus:ring outline-none focus:ring-teal-500 focus:border-teal-500 border flex-1 py-3 px-4 block w-full rounded-none rounded-r-md border-gray-300 text-gray-700"
//           placeholder="slug"
//         />
//       </div>

//       <button
//         type="submit"
//         className="px-4 py-3 mt-5 border font-bold text-lg border-transparent shadow-sm font-medium rounded-md bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
//       >
//         Shorten
//       </button>
//     </form>
//   );
// };
