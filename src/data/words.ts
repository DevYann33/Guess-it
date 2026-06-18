import type { Word } from "../types";

export default[
    {
        "word": "chat",
        "image": "/images/chat.jpg",
        "closeWords": {
            "animal": 70,
            "félin": 90,
            "chien": 40,
            "lion": 60,
            "tigre": 65,
            "miaou": 85
        }
    },
    {
        "word": "chien",
        "image": "/images/chien.jpg",
        "closeWords": {
            "animal": 70,
            "canidé": 90,
            "chat": 40,
            "loup": 80,
            "berger": 60,
            "aboyer": 85
            }
    },
    {
        "word": "avion",
        "image": "/images/avion.jpg",
        "closeWords": {
            "transport": 50,
            "aéroport": 75,
            "hélicoptère": 70,
            "pilote": 85,
            "vol": 90,
            "ciel": 60
        }
    },
    {
        "word": "vélo",
        "image": "/images/velo.jpg",
        "closeWords": {
            "transport": 50,
            "roue": 80,
            "bicyclette": 95,
            "sport": 60,
            "cycliste": 85,
            "route": 55
        }
    },
    {
        "word": "pomme",
        "image": "/images/pomme.jpg",
        "closeWords": {
            "fruit": 90,
            "poire": 60,
            "verger": 70,
            "arbre": 55,
            "rouge": 50,
            "compote": 75
            }
    }
] satisfies Word[]

 