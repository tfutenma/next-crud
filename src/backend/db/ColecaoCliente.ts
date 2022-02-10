import firebase from "../config";
import {addDoc, collection, deleteDoc, doc, DocumentReference, getDoc, getDocFromServer, getDocs, getFirestore, query, QueryDocumentSnapshot, setDoc, SnapshotOptions, where} from "firebase/firestore";
import Cliente from "../../core/Cliente";
import ClienteRepositorio from "../../core/ClienteRepositorio";

export default class ColecaoCliente implements ClienteRepositorio {


    #conversor = {
        toFirestore(cliente: Cliente) {
            return {
                nome: cliente.nome,
                idade: cliente.idade,
            }
        },
        fromFirestore(snapshot:QueryDocumentSnapshot, options:SnapshotOptions): Cliente {
            const dados = snapshot?.data(options)
            return new Cliente(dados.nome, dados.idade, snapshot?.id)
        }
    }

    async getCities(db) {
        const citiesCol = collection(db, 'cities');
        const citySnapshot = await getDocs(citiesCol);
        const cityList = citySnapshot.docs.map(doc => doc.data());
        return cityList;
    }

    async salvar(cliente: Cliente): Promise<Cliente> {
        const db = getFirestore(firebase)
        if(cliente?.id){
            await setDoc(doc(db, "clientes", cliente.id).withConverter(this.#conversor), cliente)
            return cliente
        } else {
            const docRef = await addDoc(this.#colecao().withConverter(this.#conversor), cliente)
            const document = await getDocFromServer(docRef)
            return document.data()
        }
    }
    async excluir(cliente: Cliente): Promise<void> {
        const db = getFirestore(firebase)
        const clientesRef = doc(db, "clientes", cliente.id)
        return await deleteDoc(clientesRef)
    }
    async obterTodos(): Promise<Cliente[]> {
        const docRef = this.#colecao()
        const snapshot = await getDocs(docRef)
        return snapshot.docs.map(doc => doc.data()) ?? []
    }

    #colecao(){
        const db = getFirestore(firebase)
        return collection(db, 'clientes').withConverter(this.#conversor)
    }
}