import React from "react"
import {Helmet} from "react-helmet"

const Seo = ({title, description, url = []}) => {
 return(
  <Helmet title = {title}
          htmlAttributes={{ lang: "en" }}
          meta={[
        {
          name: `title`,
          content: title,
        },
        {
          name: `description`,
          content: description,
        },
        {
          property: "og:url",
          content: url
        },
        {
          property: "og:title",
          content: title
        },
        {
          property: "og:description",
          content: description
        },
        {
          property: "og:image",
          content: '/logo_transparent.png'
        },
      ]}
   />
  )
}
export default Seo;