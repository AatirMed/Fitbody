import { configureStore, createSlice } from "@reduxjs/toolkit";

export const CommandeSlice = createSlice({
    name: "Commande",
    initialState: {
        is_Action:false,
        commande: [
            {
                "N": 1,
                "date": "01/28/2023",
                "time": "8:25:10 pm",
                "isCompleted": false,
                "All": [
                    {
                        "idP": 24,
                        "name": "Mixte",
                        "qte": 100,
                        "prix": 30,
                        "sause": "",
                        "SauseAffiche": []
                    }
                ]
            },{
                "N": 2,
                "date": "01/28/2023",
                "time": "8:25:10 pm",
                "isCompleted": true,
                "All": [
                    {
                        "idP": 32,
                        "name": "Tacos Viande Hachee",
                        "qte": 2,
                        "prix": 27,
                        "sause": "Algerienne",
                        "SauseAffiche": [
                            "Algerienne",
                            "Biggy",
                            "Barbccue",
                            "cheese",
                            "Andalouse",
                            "Samourai"
                        ]
                    }
                ]
            },
            {
                "N": 3,
                "date": "01/28/2023",
                "time": "8:25:10 pm",
                "isCompleted": false,
                "All": [
                    {
                        "idP": 24,
                        "name": "Mixte",
                        "qte": 1,
                        "prix": 30,
                        "sause": "",
                        "SauseAffiche": []
                    },
                    {
                        "idP": 32,
                        "name": "Tacos Viande Hachee",
                        "qte": 2,
                        "prix": 27,
                        "sause": "Algerienne",
                        "SauseAffiche": [
                            "Algerienne",
                            "Biggy",
                            "Barbccue",
                            "cheese",
                            "Andalouse",
                            "Samourai"
                        ]
                    }
                ]
            }
            
        ]
    },
    reducers: {
        AddCommande: (state, action) => {
            state.commande = [...action.payload]
        },DeleteCommande:(state, action)=>{
            state.commande = [...action.payload]
        },CompletedCommande:(state, action)=>{
                state.commande = [...state.commande.map(ele=>ele.N === parseInt(action.payload)?{...ele,isCompleted:true}:{...ele})]
        },ToggleAction:(state)=>{
            state.is_Action=(!state.is_Action);
        },EditCommande:(state, action)=>{
            state.commande = [...action.payload]
        }
    }
});

export const {EditCommande, ToggleAction,AddCommande ,DeleteCommande,CompletedCommande} = CommandeSlice.actions;

const store = configureStore({
    reducer: CommandeSlice.reducer
});
export default store;



// AddCommande:(state,action)=>{
// }