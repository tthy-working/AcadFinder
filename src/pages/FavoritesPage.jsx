import { useState, useEffect } from 'react';
import SideBar from '../components/sideBar';
import TopNavBar from '../components/TopNavBar';
import ProfessorCard from '../components/ProfessorCard';

/**
 * FavoritesPage Component
 * 
 * Displays all professors that have been marked as favorites
 * Loads favorites from localStorage and allows users to manage them
 */
export default function FavoritesPage() {
    const [favorites, setFavorites] = useState([]);

    /**
     * Load favorites from localStorage on component mount
     */
    useEffect(() => {
        const savedFavorites = localStorage.getItem('favoriteProfessors');
        if (savedFavorites) {
            try {
                setFavorites(JSON.parse(savedFavorites));
            } catch (error) {
                console.error('Error loading favorites:', error);
                setFavorites([]);
            }
        }
    }, []);

    return (
        <>
            <SideBar />
            <TopNavBar />
            <div className="container-fluid p-4">
                <div className="row justify-content-center mt-5">
                    <div className="mt-5"></div>
                    <div className="col-12 col-lg-10 col-xl-8 mt-5">
                        <div className="mb-4">
                            <h2>
                                <i className="fa-solid fa-star text-warning"></i> Favorite Professors
                            </h2>
                            <p className="text-muted">
                                Your saved professors for quick access
                            </p>
                        </div>

                        {favorites && favorites.length > 0 ? (
                            <div className="row">
                                {favorites.map((professor) => (
                                    <div key={professor.id} className="col-12 col-md-6 mb-3">
                                        <ProfessorCard
                                            professor={professor}
                                            favorites={favorites}
                                            setFavorites={setFavorites}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="card shadow-sm text-center p-5">
                                <div className="card-body">
                                    <i className="fa-solid fa-star fs-1 text-muted mb-3"></i>
                                    <h4>No Favorite Professors Yet</h4>
                                    <p className="text-muted">
                                        Start adding professors to your favorites and they will appear here
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
