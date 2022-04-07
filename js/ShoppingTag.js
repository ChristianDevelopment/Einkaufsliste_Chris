class ShoppingTag extends React.Component {

  /**
   * Constructor in dem die props und der Status abgerufen werden
   */

  constructor() {
    super();

    this.state = {
      aktiveGruppe: null,
      setAktiveGruppe: App.setAktiveGruppe,
      aufgeklappt: false,

    }
    this.startzustandLaden()
  }

  /**
   * Speichert den Zustand im Local Storage und wird dann wieder Geladen
   * @returns {Promise<void>}
   */

  async startzustandLaden() {
    let gespeicherterZustand = localStorage.getItem(App.STORAGE_KEY)
    if (gespeicherterZustand) {
      App.laden()
    } else {
      await App.datenEinlesen()
      this.setState(this.state)
    }
  }

  /**
   * Bestimmt die Aktive gruppe für die gekauften Artikel
   * @param gruppenID
   */

  setAktiveGruppe = (gruppenID) => {
    App.aktiveGruppe = gruppenID
    this.setState({
      aktiveGruppe: App.aktiveGruppe
    })
    console.debug(this.state.aktiveGruppe)

  }
  /**
   * Funktion für das Hinzufügen der Artikel
   */

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

  /**
   * Funktion für das Hinzufügen von Gruppen
   */

  gruppeHinzufuegen = () => {
    let eingabe = document.getElementById("gruppeEingabe")
    if (eingabe.value.trim().length > 0) {
      console.debug(App.aktiveGruppe)
      App.gruppeHinzufuegen(eingabe.value)
      this.setState(this.state)
    }
    eingabe.value = ""
    eingabe.focus()

  }
  /**
   * Funktion für das Löschen der Gruppen und der Artikel der gesamten Liste
   */

  deleteAll = () => {
    App.gruppenListe = []
    App.informieren("Liste gelöscht")
    this.setState(this.state)
  }

  /**
   * Funktion für das Checken der Artikel
   * @param artikel
   */

  artikelChecken = (artikel) => {
    artikel.gekauft = !artikel.gekauft
    this.setState(this.state)

  }

  /**
   * Funktion für das auf- und zuklappen
   */

  aufZuKlappen() {
    this.setState({aufgeklappt: !this.state.aufgeklappt})
  }

  /**
   * Render Methode
   * @returns ShoppingTag
   */

  render = () => {
    return (<div>
      <header>
        <br/>

        {/* App Logo bzw Name */}

        <center><h1>Homespot</h1></center>
        <nav>
        </nav>


      </header>

      <br/>

      <main>
        <section>

          {/* Überschrift der Kategorie Einkaufen */}

          <center><h2>Einkaufen</h2></center>
          <br/>
          <br/>
          <dl>

            {/* Funktion für Gruppenliste  */}
            
            {App.gruppenListe.map(gruppe => (
               <GruppenTag key={gruppe.id} gruppe={gruppe} erledigt={false}
                           aktiveGruppeHandler={this.setAktiveGruppe}
                           checkHandler={this.artikelChecken}
                           aktiv={gruppe.id === App.aktiveGruppe}/>))

            }


          </dl>
        </section>
        <br/>
        <section>

          <center><h2>Erledigt

            {/* On Click für das ein und Ausblenden der Liste */}

            <i onClick={() => this.aufZuKlappen()} className="material-icons eye">visibility_off</i>
          </h2></center>

          {this.state.aufgeklappt ?
             App.gruppenListe.map(gruppe => (<GruppenTag
                key={gruppe.id} gruppe={gruppe} erledigt={true}
                aktiveGruppeHandler={this.setAktiveGruppe}
                inaktiv={gruppe.id === App.aktiveGruppe}
                checkHandler={this.artikelChecken}

             />)) : ''}
        </section>
      </main>

      <br/>
      <hr/>

      <footer>
        <nav>

          <div className="eingabefeld">


            {/*Gruppen hinzufügen mit Eingabefeld*/}

            <center className="gruppeEingabe">

              <input className="gruppeEingabe" type="text" placeholder="Gruppe Hinzufügen" id="gruppeEingabe"
              />

              <button onClick={this.gruppeHinzufuegen} className="gruppePlus"><span
                 className="material-icons">bookmark_add</span>

              </button>
            </center>
            
            {/*Button für Artikel hinzufügen mit Eingabefeld*/}


            <center className="gruppeEingabe">

              <input className="eingabefeld" type="text" placeholder="Artikel hinzufügen" id="artikelEingabe"/>

              <button className="artikelPlus material-icons" onClick={this.artikelHinzufuegen}>add_circle</button>

            </center>
          </div>

          <br/>

          {/*Button für Liste Löschen Button*/}

          <center>
            <button className="gruppeDelete" onClick={this.deleteAll}>
              <span className="material-icons">delete</span> Liste Löschen
            </button>
          </center>

          <br/>

        </nav>
      </footer>

    </div>)
  }
}