class ShoppingTag extends React.Component {

  constructor() {
    super();

    this.state = {
      aktiveGruppe: null, setAktiveGruppe: App.setAktiveGruppe
    }

    let gruppe1 = App.gruppeHinzufuegen("Obst & Gemüse")
    gruppe1.artikelHinzufuegen("Brokkoli")
    let gruppe2 = App.gruppeHinzufuegen("Getreideprodukte")
    gruppe2.artikelHinzufuegen("Reis")
    let gruppe3 = App.gruppeHinzufuegen("Milchprodukte")
    gruppe3.artikelHinzufuegen("Streukäse")
    let gruppe4 = App.gruppeHinzufuegen("Getränke")
    gruppe4.artikelHinzufuegen("Wasser")
    let gekaufterArtikel = gruppe3.artikelHinzufuegen("Milch")
    gekaufterArtikel.gekauft = true

  }

  setAktiveGruppe = (gruppenID) => {
    App.aktiveGruppe = gruppenID
    this.setState({
      aktiveGruppe: App.aktiveGruppe
    })
    console.debug(this.state.aktiveGruppe)

  }
  artikelHinzufuegen = () => {
    let eingabe = document.getElementById("artikelEingabe")
    if (eingabe.value.trim().length > 0) {
      console.debug(App.aktiveGruppe)
      App.gruppeFinden(App.aktiveGruppe)
      let gruppe = App.gruppeFinden(App.aktiveGruppe)
      gruppe.artikelHinzufuegen(eingabe.value)
      this.setState(this.state)
    }
    eingabe.value = ""
    eingabe.focus()

  }

  artikelChecken = (artikel) => {
    artikel.gekauft = !artikel.gekauft
    this.setState(this.state)
    
}
  
  render = () => {
    return (<div>
      <header>
        <center><h1>Homespot</h1></center>
        <nav>
          <center><input type="text" placeholder="Artikel hinzufügen" id="artikelEingabe"/>
            <button onClick={this.artikelHinzufuegen} className="material-icons">add_circle</button>
          </center>
        </nav>
      </header>
      <hr/>

      <main>
        <section>
          <center><h2>Einkaufen
            <i className="material-icons">expand_less</i>
          </h2></center>
          <dl>

            {App.gruppenListe.map(gruppe => (
               <GruppenTag key={gruppe.id} gruppe={gruppe} erledigt={false}
                           aktiveGruppeHandler={this.setAktiveGruppe}
                           checkHandler={this.artikelChecken}
                           aktiv={gruppe.id === App.aktiveGruppe}/>))
            
            }


          </dl>
        </section>
        <hr/>
        <section>
          <center><h2>Erledigt
            <i className="material-icons">expand_less</i>
          </h2></center>
          {App.gruppenListe.map(gruppe => (<GruppenTag
             key={gruppe.id} gruppe={gruppe} erledigt={true}
             aktiveGruppeHandler={this.setAktiveGruppe}
             inaktiv={gruppe.id === App.aktiveGruppe}
             checkHandler={this.artikelChecken}
          />))}
        </section>
      </main>
      <hr/>

      <footer>
        <nav>
          <button>
            <span className="material-icons">bookmark_add</span> Gruppen
          </button>
          <button>
            <span className="material-icons">sort</span> Sortieren
          </button>
          <button>
            <span className="material-icons">settings</span> Einstellungen
          </button>
        </nav>
      </footer>
    </div>)
  }
}
