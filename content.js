function addContent() {
    console.log("Content script loaded");

    const article = document.querySelector('article');
    const sections = article ? article.querySelectorAll('section') : null;
    const searchSection = sections && sections.length ? sections[2] : null;

    const newSectionHTML = `
    <br class="clearfloat"/>
    <h2 class="section-header custom-attack-header" style="cursor: pointer;">Attack particular player (cost: 10 Gold coins)</h2>
    <section style="display: block;">
       <table width="80%" style="width: 50%;">
        <tbody>
            <tr>
                <th width="45%" style="width: 85%;">Name</th>
                <th>&nbsp;</th>
            </tr>

            <tr>
                <td><span class="floatEnd"></span>
                <a target="_blank" href="https://s47-en.gladiatus.gameforge.com/game/index.php?mod=player&amp;p=7347805&amp;language=en">KRYPTOGROM</td>
                <td>
                <div class="attack" data-player="KRYPTOGROM"/>
                </td>
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

    // on click listener for attack buttons
    document.querySelectorAll('.attack[data-player]').forEach(btn => {
        btn.addEventListener('click', function() {
            const playerName = this.getAttribute('data-player');
            attackPlayerByName(playerName);
        });
    });

    // on click listener for the whole section to hide the functionality
    const header = document.querySelector('h2.custom-attack-header');
    if (header) {
        header.addEventListener('click', function() {
            const section = header.nextElementSibling;
            if (section && section.tagName.toLowerCase() === 'section') {
                section.style.display = section.style.display === 'none' ? 'block' : 'none';
            }
        });
    }
}

function attackPlayerByName(playerName) {
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



function injectTableRowStyle() { //todo maybe you can use later that border for some prioritization
    const style = document.createElement('style');
    const bodyStyles = getComputedStyle(document.body);
    console.log('Text color:', bodyStyles.color);
    console.log('Background color:', bodyStyles.backgroundColor);
    const el = document.querySelector('h1');
    if (el) {
        const styles = getComputedStyle(el);
        console.log('h1 color:', styles.color);
        console.log('h1 background:', styles.backgroundColor);
    }

    style.textContent = `
        table {
            border-collapse: collapse;
        }
        tbody td, tbody th {
            border-bottom: 1px solid #c4ac70;
        }
        tbody tr:last-child td, tbody tr:last-child th {
            border-bottom: none;
        }
    `;
    document.head.appendChild(style);
}


if (!window.location.href.includes('submod')) {
    //injectTableRowStyle()
    addContent()
}


