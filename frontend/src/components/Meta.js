import React from 'react'
import { Helmet } from 'react-helmet'
function Meta({ title, description, keywords }) {
    return (
        <div>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name='keywords' content={keywords} />
            </Helmet>
        </div>
    )
}

Meta.defaultProps = {
    title: 'Welcome to Myshop',
    description: 'We sell the best products for cheap',
    keywords: 'electronics, buy electronics, cheap electronics'
}

export default Meta
