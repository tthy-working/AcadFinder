import { useState } from 'react';

export default function FavoriteButton({ professor, onToggleFavorite, isFavorited = false }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleToggleFavorite = async () => {
        setIsLoading(true);

        try {
            await onToggleFavorite(professor);

            console.log(
                isFavorited
                    ? `Removed ${professor.name} from favorites`
                    : `Added ${professor.name} to favorites`
            );
        } catch (error) {
            console.error('Error toggling favorite:', error);
            alert('Failed to update favorite. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            className={`btn btn-sm ${isFavorited ? 'btn-warning' : 'btn-outline-warning'}`}
            onClick={handleToggleFavorite}
            disabled={isLoading}
            title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        >
            {isLoading ? (
                <span className="spinner-border spinner-border-sm"></span>
            ) : (
                <>
                    <i className={`bi ${isFavorited ? 'bi-star-fill' : 'bi-star'}`}></i>
                    {isFavorited ? ' Favorited' : ' Favorite'}
                </>
            )}
        </button>
    );
}
