import React, { Suspense } from 'react'
import '../App.css'

export default function Artist() {
    const ArtistView = React.lazy(() => import('./ArtistView'))
    return (
        <Suspense fallback={<div className="loading-screen"><h1>loading..</h1></div>}>
            <ArtistView />
        </Suspense>
    );
}
