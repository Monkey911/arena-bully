function addContent() {
    console.log("Content script loaded");

    const article = document.querySelector('article');
    const sections = article ? article.querySelectorAll('section') : null;
    const searchSection = sections && sections.length ? sections[2] : null;

    const newSectionHTML = `
    <br class="clearfloat"/>
    <h2 class="section-header" style="cursor: pointer;">Attack particular player (cost: 10 Gold coins)</h2>
    <section style="display: block;">
       <table width="80%" style="width: 100%;">
        <tbody>
            <tr>
                <th width="45%" style="width: 85%;">Name</th>
                <th>&nbsp;</th>
            </tr>
            
            <tr>
                <td><span class="floatEnd"></span>
                <a target="_blank" href="https://s47-en.gladiatus.gameforge.com/game/index.php?mod=player&amp;p=5274228&amp;language=en">KRYPTOS</td>
                <td>
                <div class="attack" data-player="KRYPTOS"/>
                </td>
            </tr>
            
        </tbody></table>
    </section>
    `;

    if (searchSection) {
        searchSection.insertAdjacentHTML('afterend', newSectionHTML);
    }

    document.querySelectorAll('.attack[data-player]').forEach(btn => {
        btn.addEventListener('click', function() {
            const playerName = this.getAttribute('data-player');
            attackPlayerByName(playerName);
        });
    });
}

function attackPlayerByName(playerName) {
    console.log('attacking player by name:', playerName);
    const form = document.querySelector('form[action*="mod=arena"]');
    if (form) {
        const nameInput = form.querySelector('input[name="ujn"]');
        if (nameInput) {
            nameInput.value = playerName;
            const goButton = form.querySelector('.button3[type="submit"]');
            if (goButton) {
                goButton.click();
            }
        }
    }
}


if (!window.location.href.includes('submod')) {
    addContent()
}


