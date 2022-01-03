import { useState, useEffect } from 'react';
import axios from "axios";

const Sitemap = () => {

const [map, setMap] = useState([]);

    useEffect(() => {
        const url = process.env.REACT_APP_API_URL + '/posts-sitemap.xml/';
        axios.get(url, {
            responseType: 'text/xml',
            "Content-Type": "application/xml; charset=utf-8"
        })
            .then((rsp) => {
                // setPost(rsp.data)
                setMap(rsp.data)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setMap])
    return (
        <pre className="xml-body">
            {map}
        </pre>
    )
}

export default Sitemap;