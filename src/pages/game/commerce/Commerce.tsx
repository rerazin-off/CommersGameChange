import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Commerce_2.module.scss';
import CardFinish from './components/CardFinish/CardFinish';
import { Button } from '../../../components/Button/Button';

enum RoutesEnum {
    TORGASHI = '/tovaroveds'
}

interface Product {
    src: string;
    alt: string;
    category: string;
}

interface Refrigerator {
    src: string;
    alt: string;
    categories: string[];
}

interface MatchedItem {
    productIndex: number;
    refrigeratorIndex: number;
    isCorrect: boolean;
}

interface ImageCardProps {
    src: string;
    alt: string;
    draggable?: boolean;
    onDragStart?: (e: React.DragEvent) => void;
    onDrop?: (e: React.DragEvent) => void;
    onDragOver?: (e: React.DragEvent) => void;
    onTouchStart?: (e: React.TouchEvent) => void;
    onTouchMove?: (e: React.TouchEvent) => void;
    onTouchEnd?: (e: React.TouchEvent) => void;
    isMatched?: boolean;
    style?: React.CSSProperties;
    isCorrect?: boolean;
    onClick?: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({
    src,
    alt,
    draggable = false,
    onDragStart = () => { },
    onDrop = () => { },
    onDragOver = () => { },
    onTouchStart = () => { },
    onTouchMove = () => { },
    onTouchEnd = () => { },
    isMatched = false,
    isCorrect = true,
    style = {},
    onClick = () => { }
}) => {
    return (
        <div
            draggable={draggable}
            onDragStart={onDragStart}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onClick={onClick}
            style={{
                height: '110px',
                width: '110px',
                position: 'relative',
                margin: '7px',
                cursor: draggable ? 'grab' : 'default',
                opacity: isMatched ? 0.5 : 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: isCorrect ? 'transparent' : 'rgba(255, 0, 0, 0.3)',
                touchAction: 'manipulation',
                ...style
            }}
        >
            <img
                src={src}
                alt={alt}
                style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    borderRadius: '12px',
                    userSelect: 'none',
                    WebkitUserDrag: 'none',
                    pointerEvents: 'none'
                }}
            />
        </div>
    );
};

const Commerce: React.FC = () => {
    const navigate = useNavigate();
    const [openIsCard, setOpenIsCard] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [allProductsMatched, setAllProductsMatched] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isVisibleButton, setIsVisibleButton] = useState(false);
    const [showResults, setShowResults] = useState(false);

    // Refs for touch handling
    const touchCloneRef = useRef<HTMLDivElement | null>(null);
    const touchStartPos = useRef({ x: 0, y: 0 });
    const touchOffset = useRef({ x: 0, y: 0 });
    const draggedProductIndex = useRef<number | null>(null);
    const draggedFromRefrigeratorIndex = useRef<number | null>(null);
    const draggedFromPurpleZone = useRef<boolean>(false);

    const products: Product[] = [
        { src: '/src/assets/img/commerce_img/img_2/k.png', alt: 'k1', category: 'k' },
        { src: '/src/assets/img/commerce_img/img_2/m1.png', alt: 'm1', category: 'm' },
        { src: '/src/assets/img/commerce_img/img_2/r.png', alt: 'r1', category: 'r' },
        { src: '/src/assets/img/commerce_img/img_2/k2.png', alt: 'k2', category: 'k' },
        { src: '/src/assets/img/commerce_img/img_2/r2.png', alt: 'r2', category: 'r' },
        { src: '/src/assets/img/commerce_img/img_2/r3.png', alt: 'r3', category: 'r' },
        { src: '/src/assets/img/commerce_img/img_2/s1.png', alt: 's1', category: 's' },
        { src: '/src/assets/img/commerce_img/img_2/k3.png', alt: 'k3', category: 'k' },
        { src: '/src/assets/img/commerce_img/img_2/s2.png', alt: 's2', category: 's' },
        { src: '/src/assets/img/commerce_img/img_2/m2.png', alt: 'm2', category: 'm' },
        { src: '/src/assets/img/commerce_img/img_2/s3.png', alt: 's3', category: 's' },
        { src: '/src/assets/img/commerce_img/img_2/m3.png', alt: 'm3', category: 'm' },
    ];

    const refrigerators: Refrigerator[] = [
        { src: '/src/assets/img/commerce_img/img_2/b1.png', alt: 'Крупы', categories: ['k'] },
        { src: '/src/assets/img/commerce_img/img_2/b2.png', alt: 'Рыбка', categories: ['r'] },
        { src: '/src/assets/img/commerce_img/img_2/b3.png', alt: 'Сладкое', categories: ['s'] },
        { src: '/src/assets/img/commerce_img/img_2/b4.png', alt: 'Молоко', categories: ['m'] },
    ];

    const [matchedItems, setMatchedItems] = useState<MatchedItem[]>([]);
    const [productsInPurpleZone, setProductsInPurpleZone] = useState<number[]>([]);

    useEffect(() => {
        const allPlaced = matchedItems.length + productsInPurpleZone.length === products.length;
        setAllProductsMatched(allPlaced);
        setIsVisibleButton(matchedItems.length > 0 || productsInPurpleZone.length > 0);
    }, [matchedItems, productsInPurpleZone, products.length]);

    // Touch handlers
    const handleTouchStart = (e: React.TouchEvent, productIndex: number, fromRefrigerator?: number, fromPurpleZone?: boolean) => {
        const touch = e.touches[0];
        const element = e.currentTarget as HTMLElement;
        const rect = element.getBoundingClientRect();

        // Create clone for dragging
        const clone = document.createElement('div');
        clone.style.position = 'fixed';
        clone.style.zIndex = '1000';
        clone.style.pointerEvents = 'none';
        clone.style.transform = 'scale(1.1)';
        clone.style.transition = 'transform 0.1s';
        clone.style.width = '110px';
        clone.style.height = '110px';
        clone.style.left = `${rect.left}px`;
        clone.style.top = `${rect.top}px`;
        clone.style.display = 'flex';
        clone.style.justifyContent = 'center';
        clone.style.alignItems = 'center';

        const img = document.createElement('img');
        img.src = products[productIndex].src;
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100%';
        img.style.objectFit = 'contain';
        img.style.borderRadius = '12px';
        clone.appendChild(img);

        document.body.appendChild(clone);
        touchCloneRef.current = clone;

        // Save start positions
        touchStartPos.current = {
            x: touch.clientX,
            y: touch.clientY
        };
        touchOffset.current = {
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top
        };

        draggedProductIndex.current = productIndex;
        setErrorMessage(null);

        if (fromRefrigerator !== undefined) {
            draggedFromRefrigeratorIndex.current = fromRefrigerator;
        } else if (fromPurpleZone) {
            draggedFromPurpleZone.current = true;
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (touchCloneRef.current && e.touches.length > 0) {
            const touch = e.touches[0];
            const clone = touchCloneRef.current;

            clone.style.left = `${touch.clientX - touchOffset.current.x}px`;
            clone.style.top = `${touch.clientY - touchOffset.current.y}px`;
        }
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchCloneRef.current && draggedProductIndex.current !== null) {
            const touch = e.changedTouches[0];
            const clone = touchCloneRef.current;

            // Find drop target
            const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
            
            if (dropTarget) {
                // Check if dropped on refrigerator
                const refrigeratorElement = dropTarget.closest('[data-refrigerator]');
                if (refrigeratorElement) {
                    const refrigeratorIndex = parseInt(refrigeratorElement.getAttribute('data-refrigerator') || '0');
                    handleDropOnRefrigerator(refrigeratorIndex);
                } 
                // Check if dropped on purple zone
                else if (dropTarget.closest('[data-purple-zone]')) {
                    handleDropOnPurpleZone();
                }
                // If dragged from refrigerator and dropped elsewhere - return to purple zone
                else if (draggedFromRefrigeratorIndex.current !== null) {
                    handleDropOnPurpleZone();
                }
                // If dragged from purple zone and dropped elsewhere - do nothing (return to original position)
            }

            // Cleanup
            clone.remove();
            touchCloneRef.current = null;
            draggedProductIndex.current = null;
            draggedFromRefrigeratorIndex.current = null;
            draggedFromPurpleZone.current = false;
        }
    };

    const handleDropOnRefrigerator = (refrigeratorIndex: number) => {
        if (draggedProductIndex.current !== null) {
            const productIndex = draggedProductIndex.current;
            const product = products[productIndex];
            const refrigerator = refrigerators[refrigeratorIndex];
            
            const isCorrectPlacement = refrigerator.categories.includes(product.category);

            // If dragged from another refrigerator
            if (draggedFromRefrigeratorIndex.current !== null) {
                setMatchedItems(prev => [
                    ...prev.filter(item => item.productIndex !== productIndex),
                    {
                        productIndex: productIndex,
                        refrigeratorIndex: refrigeratorIndex,
                        isCorrect: isCorrectPlacement
                    }
                ]);
            } 
            // If dragged from purple zone
            else if (draggedFromPurpleZone.current) {
                setProductsInPurpleZone(prev => prev.filter(index => index !== productIndex));
                setMatchedItems(prev => [
                    ...prev,
                    {
                        productIndex: productIndex,
                        refrigeratorIndex: refrigeratorIndex,
                        isCorrect: isCorrectPlacement
                    }
                ]);
            }
            // If dragged from products area
            else {
                setMatchedItems(prev => [
                    ...prev,
                    {
                        productIndex: productIndex,
                        refrigeratorIndex: refrigeratorIndex,
                        isCorrect: isCorrectPlacement
                    }
                ]);
            }
        }
    };

    const handleDropOnPurpleZone = () => {
        if (draggedProductIndex.current !== null) {
            const productIndex = draggedProductIndex.current;
            
            // If dragged from refrigerator
            if (draggedFromRefrigeratorIndex.current !== null) {
                setMatchedItems(prev => prev.filter(item => item.productIndex !== productIndex));
                setProductsInPurpleZone(prev => [...prev, productIndex]);
            } 
            // If dragged from purple zone - do nothing (will return to original position)
            else if (!draggedFromPurpleZone.current) {
                // If dragged from products area
                setProductsInPurpleZone(prev => [...prev, productIndex]);
            }
        }
    };

    const removeFromRefrigerator = (productIndex: number) => {
        setMatchedItems(matchedItems.filter(item => item.productIndex !== productIndex));
        setProductsInPurpleZone([...productsInPurpleZone, productIndex]);
    };

    const removeFromPurpleZone = (productIndex: number) => {
        setProductsInPurpleZone(productsInPurpleZone.filter(index => index !== productIndex));
    };

    const checkResults = () => {
        setAttempts(prev => prev + 1);
        setOpenIsCard(true);
    };

    const resetGame = () => {
        setMatchedItems([]);
        setProductsInPurpleZone([]);
        setAttempts(0);
        setErrorMessage(null);
    };

    const isProductMatched = (productIndex: number) => {
        return matchedItems.some(item => item.productIndex === productIndex);
    };

    const handleCloseCard = () => {
        setOpenIsCard(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const calculateResults = () => {
        const correct = matchedItems.filter(item => item.isCorrect).length;
        const incorrect = matchedItems.filter(item => !item.isCorrect).length;
        return { correct, incorrect };
    };

    const isRefrigeratorPerfect = (refrigeratorIndex: number) => {
        const itemsInRefrigerator = matchedItems.filter(
            item => item.refrigeratorIndex === refrigeratorIndex && item.isCorrect
        );
        return itemsInRefrigerator.length >= 3;
    };

    return (
        <div style={{
            overflow: 'hidden',
            backgroundImage: 'url(/src/assets/img/commerce_img/img_2/fon.png)',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            padding: '20px',
            position: 'relative',
            width: '100%',
            minHeight: '100vh',
            paddingTop: '80px',
            paddingBottom: '80px'
        }}>
            {errorMessage && (
                <div style={{
                    position: 'fixed',
                    top: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'rgba(255, 0, 0, 0.8)',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    zIndex: 1000,
                    animation: 'fadeIn 0.3s'
                }}>
                    {errorMessage}
                </div>
            )}

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '30px',
                marginTop: '30px',
                height: '600px'
            }}>
                {/* Products section (Purple zone) */}
                <div
                    style={{
                        flex: '1',
                        backgroundColor: '#FFC0CB',
                        padding: '20px',
                        borderRadius: '15px',
                        maxWidth: '790px',
                        height: '850px',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        alignItems: 'center',
                        marginLeft: '30px',
                        transform: 'translate(0px, -70px)'
                    }}
                    onDrop={handleDropOnPurpleZone}
                    onDragOver={handleDragOver}
                    data-purple-zone="true"
                >
                    <div className={classes.texts} style={{ textAlign: 'center', width: '100%' }}>
                        <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>ОБОРУДОВАНИЕ</h2>
                    </div>
                    <div style={{
                        fontFamily: 'Cruinn Regular',
                        color: 'while',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        height: '100%',
                        overflow: 'auto',
                        width: '100%',
                        padding: '10px'
                    }}>
                        {products.map((product, productIndex) => (
                            !isProductMatched(productIndex) && !productsInPurpleZone.includes(productIndex) ? (
                                <ImageCard
                                    key={`product-${productIndex}`}
                                    src={product.src}
                                    alt={product.alt}
                                    draggable={true}
                                    onDragStart={(e) => handleDragStart(e, productIndex)}
                                    onTouchStart={(e) => handleTouchStart(e, productIndex)}
                                    onTouchMove={handleTouchMove}
                                    onTouchEnd={handleTouchEnd}
                                    style={{
                                        transform: draggedProductIndex.current === productIndex ? 'scale(1.05)' : 'none',
                                        transition: 'transform 0.2s',
                                    }}
                                />
                            ) : productsInPurpleZone.includes(productIndex) ? (
                                <ImageCard
                                    key={`product-purple-${productIndex}`}
                                    src={product.src}
                                    alt={product.alt}
                                    draggable={true}
                                    onDragStart={(e) => handleDragStart(e, productIndex)}
                                    onTouchStart={(e) => handleTouchStart(e, productIndex, undefined, true)}
                                    onTouchMove={handleTouchMove}
                                    onTouchEnd={handleTouchEnd}
                                    onClick={() => removeFromPurpleZone(productIndex)}
                                    style={{
                                        width: '110px',
                                        height: '110px',
                                        margin: '7px',
                                        transform: draggedProductIndex.current === productIndex ? 'scale(1.05)' : 'none',
                                        transition: 'transform 0.2s',
                                        cursor: 'pointer'
                                    }}
                                />
                            ) : null
                        ))}
                    </div>
                </div>

                {/* Refrigerators section */}
                <div
                    style={{
                        flex: '1',
                        maxWidth: '700px',
                        position: 'relative',
                    }}
                    onDragOver={handleDragOver}
                >
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '30px',
                        height: '100%'
                    }}>
                        {refrigerators.map((refrigerator, refrigeratorIndex) => {
                            const itemsInRefrigerator = matchedItems.filter(item =>
                                item.refrigeratorIndex === refrigeratorIndex
                            );
                            const isPerfect = isRefrigeratorPerfect(refrigeratorIndex);

                            return (
                                <div
                                    key={`refrigerator-${refrigeratorIndex}`}
                                    data-refrigerator={refrigeratorIndex}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        backgroundColor: '#FFC0CB',
                                        height: '400px',
                                        width: "400px",
                                        borderRadius: '15px',
                                        position: 'relative',
                                        zIndex: 1,
                                        border: isPerfect ? '4px solid #7B74EB' : 'none',
                                        boxShadow: isPerfect ? '0 0 20px #7B74EB' : '0 4px 12px rgba(0,0,0,0.2)',
                                        transition: 'all 0.3s ease',
                                        padding: '15px',
                                        transform: 'translate(-255px, -70px)',
                                    }}
                                >
                                    {isPerfect && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '-20px',
                                            backgroundColor: '#7B74EB',
                                            color: 'white',
                                            padding: '5px 15px',
                                            borderRadius: '15px',
                                            fontSize: '16px',
                                            fontWeight: 'bold'
                                        }}>
                                            Заполнен
                                        </div>
                                    )}
                                    <ImageCard
                                        src={refrigerator.src}
                                        alt={refrigerator.alt}
                                        onDragOver={handleDragOver}
                                        style={{ width: '220px', height: '220px' }}
                                    />
                                    <div style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        justifyContent: 'center',
                                        marginTop: '15px',
                                        gap: '10px'
                                    }}>
                                        {itemsInRefrigerator
                                            .map((item, idx) => (
                                                <ImageCard
                                                    key={`matched-${refrigeratorIndex}-${idx}`}
                                                    src={products[item.productIndex].src}
                                                    alt={products[item.productIndex].alt}
                                                    isCorrect={item.isCorrect}
                                                    draggable={true}
                                                    onDragStart={(e) => handleDragStart(e, item.productIndex, refrigeratorIndex)}
                                                    onTouchStart={(e) => handleTouchStart(e, item.productIndex, refrigeratorIndex)}
                                                    onTouchMove={handleTouchMove}
                                                    onTouchEnd={handleTouchEnd}
                                                    onClick={() => removeFromRefrigerator(item.productIndex)}
                                                    style={{
                                                        width: '110px',
                                                        height: '110px',
                                                        cursor: 'pointer'
                                                    }}
                                                />
                                            ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            {isVisibleButton && (
                <div onClick={checkResults} className={classes.checkButton} style={{ marginTop: '30px' }}>
                    <Button bgColor="blue" type="type1v2" style={{ fontSize: '20px', padding: '15px 30px' }}>
                        Завершить
                    </Button>
                </div>
            )}
            <div className={classes.backButton} style={{
                marginTop: '40px',
                marginBottom: '40px'
            }}>
                <Button
                    bgColor="pink"
                    type="type1v2"
                    onClick={() => {
                        localStorage.setItem('fromGame', 'true');
                        navigate(RoutesEnum.TORGASHI);
                    }}
                    style={{ fontSize: '20px', padding: '15px 30px' }}
                >
                    НАЗАД
                </Button>
            </div>

            <CardFinish
                attempts={attempts}
                isOpenCard={openIsCard}
                onClose={handleCloseCard}
            />
        </div>
    );
};

export default Commerce;