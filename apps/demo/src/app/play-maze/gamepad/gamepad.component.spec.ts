import { Shallow } from 'shallow-render';
import { AppModule } from '../../app.module';

import { GamepadComponent } from './gamepad.component';

describe('GamepadComponent', () => {
  let component: Shallow<GamepadComponent>;

  beforeEach(() => {
    component = new Shallow(GamepadComponent, AppModule);
    jest.clearAllMocks();
  });

  it('should render Gamepad', async () => {
    const rendering = await component.render();
    expect(rendering).toBeTruthy();
  });

  it('should include four movement buttons and one reset button.', async () => {
    const { find } = await component.render({
      bind: {
        availableMoveNames: ['Up', 'Down', 'Left', 'Right'],
      },
    });

    expect(find(`.move-btns > button`)).toHaveFound(4);
    expect(find(`button[name="Up"]`).nativeElement.textContent).toEqual('Up');
    expect(find(`button[name="Down"]`).nativeElement.textContent).toEqual('Down');
    expect(find(`button[name="Left"]`).nativeElement.textContent).toEqual('Left');
    expect(find(`button[name="Right"]`).nativeElement.textContent).toEqual('Right');
    expect(find(`button[name="reset-game"]`)).toHaveFoundOne();
  });

  it('click movement button should trigger output emitter updateSelectedMove with button name.', async () => {
    const { find, outputs, instance } = await component.render({
      bind: {
        availableMoveNames: ['Up', 'Down', 'Left', 'Right'],
      },
    });

    const onMoveClickSpy = jest.spyOn(instance, 'onMoveClick');
    find('button[name="Up"]').triggerEventHandler('click', { target: { name: 'Up' } });
    expect(onMoveClickSpy).toHaveBeenCalledWith({ target: { name: 'Up' } });
    expect(outputs.updateSelectedMove.emit).toHaveBeenCalledWith('Up');
  });

  it('click reset game button should trigger output emitter resetGame.', async () => {
    const { find, outputs, instance } = await component.render({
      bind: {
        availableMoveNames: ['Up', 'Down', 'Left', 'Right'],
      },
    });

    const onResetClickSpy = jest.spyOn(instance, 'onResetClick');
    find('button[name="reset-game"]').triggerEventHandler('click', {});
    expect(onResetClickSpy).toHaveBeenCalled();
    expect(outputs.resetGame.emit).toHaveBeenCalled();
  });
});
